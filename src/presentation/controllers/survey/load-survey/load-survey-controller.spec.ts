import MockDate from 'mockdate'
import { LoadSurveysController } from './load-survey-controller'
import { LoadSurveys, SurveyModel, HttpRequest } from './load-survey-controller-protocols'
import { noContent, serverError, successResponse } from '@/presentation/helpers/http/http-helpers'

const makeRequest = (): HttpRequest => ({
  accountId: 'any_accountId'
})

const makeFakesurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

const makeLoadSurvey = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (accountId: string): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(makeFakesurveys()))
    }
  }
  return new LoadSurveysStub()
}

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys

}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurvey()
  const sut = new LoadSurveysController(loadSurveysStub)

  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const httpRequest = makeRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.accountId)
  })

  test('Should 200 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(successResponse(makeFakesurveys()))
  })

  test('Should returns 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(
      new Promise((_, reject) => reject(new Error()))
    )

    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should 204 if LoadSurvey returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(
      new Promise(resolve => resolve([]))
    )
    const httpResponse = await sut.handle(makeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
