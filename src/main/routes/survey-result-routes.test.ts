import request from 'supertest'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { app } from '@/main/config/app'
import env from '@/main/config/env'

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Result Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save surveys result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      const result = await accountCollection.insertOne({
        name: 'John Due',
        email: 'john@mail.com',
        password: '123'
      })
      const account = await accountCollection.findOne({ _id: result.insertedId })
      const id = account._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      const res = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })

      const surveyId = await surveyCollection.findOne({ _id: res.insertedId })

      await request(app)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .put(`/api/surveys/${surveyId._id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1'
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on load surveys result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403)
    })

    test('Should return 200 on load survey result with accessToken', async () => {
      const result = await accountCollection.insertOne({
        name: 'John Due',
        email: 'john@mail.com',
        password: '123'
      })
      const account = await accountCollection.findOne({ _id: result.insertedId })
      const id = account._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })
      const res = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      const surveyId = await surveyCollection.findOne({ _id: res.insertedId })

      await request(app)
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .get(`/api/surveys/${surveyId._id}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
