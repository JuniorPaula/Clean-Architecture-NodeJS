import { Collection, ObjectId } from 'mongodb'
import { SurveyResultMongoRepository } from './survey-reault-mongo-reposiotory'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyModel } from '@/domain/models/survey'
import { AccountModel } from '@/domain/models/account'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer_1'
      }, {
        answer: 'any_answer_2'
      }, {
        answer: 'any_answer_3'
      }
    ],
    date: new Date()
  })
  const survey = await surveyCollection.findOne({ _id: res.insertedId })
  return MongoHelper.map(survey)
}

const makeAccount = async (): Promise<AccountModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })
  const survey = await accountCollection.findOne({ _id: res.insertedId })
  return MongoHelper.map(survey)
}

describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const surveyResult = surveyResultCollection.findOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id)
      })
      expect(surveyResult).toBeTruthy()
    })

    test('Should add a survey result if its NOT new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      const surveyResult = surveyResultCollection.find({
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id)
      }).toArray()

      expect(surveyResult).toBeTruthy()
      expect((await surveyResult).length).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load survey result', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const account2 = await makeAccount()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account2.id),
        answer: survey.answers[0].answer,
        date: new Date()
      }])

      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account.id)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('Should load survey result 2', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const account2 = await makeAccount()
      const account3 = await makeAccount()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account2.id),
        answer: survey.answers[1].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account3.id),
        answer: survey.answers[1].answer,
        date: new Date()
      }])

      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account2.id)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(67)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(33)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('Should load survey result 3', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const account2 = await makeAccount()
      const account3 = await makeAccount()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        accountId: new ObjectId(account2.id),
        answer: survey.answers[1].answer,
        date: new Date()
      }])

      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account3.id)

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[0].isCurrentAccountAnswer).toBe(false)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[1].isCurrentAccountAnswer).toBe(false)
    })

    test('Should return null if there is no survey result', async () => {
      const account = await makeAccount()
      const survey = await makeSurvey()
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, account.id)
      expect(surveyResult).toBeNull()
    })
  })
})
