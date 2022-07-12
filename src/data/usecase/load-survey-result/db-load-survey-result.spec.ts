import MockDate from 'mockdate'
import {
  LoadSurveyResultRepository,
  LoadSurveyByIdRepository,
  SurveyResultModel,
  SurveyModel
} from './db-load-survey-result-protocols'
import { DbLoadSurveyResult } from './db-load-survey-result'

const makeFakeSurveyResult = (): SurveyResultModel => ({
  surveyId: 'any_surveyId',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 1,
    percent: 50,
    isCurrentAccountAnswer: true
  },
  {
    answer: 'another_answer',
    image: 'any_image',
    count: 10,
    percent: 80,
    isCurrentAccountAnswer: true
  }],
  date: new Date()
})

const makeFakeEmptySurveyResult = (): SurveyResultModel => ({
  surveyId: 'any_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 0,
    percent: 0,
    isCurrentAccountAnswer: false
  },
  {
    answer: 'another_answer',
    image: 'any_image',
    count: 0,
    percent: 0,
    isCurrentAccountAnswer: false
  }],
  date: new Date()
})

const makeFakesurvey = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      answer: 'any_answer'
    },
    {
      answer: 'another_answer',
      image: 'any_image'
    }],
    date: new Date()
  }
}

const makeLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositorystub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
      return await Promise.resolve(makeFakeSurveyResult())
    }
  }
  return new LoadSurveyResultRepositorystub()
}

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (): Promise<SurveyModel> {
      return await new Promise(resolve => resolve(makeFakesurvey()))
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepository()
  const loadSurveyResultRepositoryStub = makeLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub)

  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
  }
}

describe('Db LoadSurveyResult usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()

    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_surveyId', 'any_accountId')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_surveyId', 'any_accountId')
  })

  test('Should call LoadSurveyIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(
      new Promise(resolve => resolve(null))
    )

    const loadBySurveyIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.load('any_surveyId', 'any_accountId')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_surveyId')
  })

  test('Should return surveyResultModel with all answers count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(
      new Promise(resolve => resolve(null))
    )

    const surveyResult = await sut.load('any_surveyId', 'any_accountId')
    expect(surveyResult).toEqual(makeFakeEmptySurveyResult())
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()

    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.load('any_surveyId', 'any_accountId')
    await expect(promise).rejects.toThrow()
  })

  test('Should return surveyResultModel on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.load('any_surveyId', 'any_accountId')
    expect(surveyResult).toEqual(makeFakeSurveyResult())
  })
})
