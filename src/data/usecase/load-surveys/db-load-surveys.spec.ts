import MockDate from 'mockdate'
import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveyRepository, SurveyModel } from './db-load-surveys-protocols'

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

const makeFakeLoadSurveysRepository = (): LoadSurveyRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveyRepository {
    async loadAll (accountId: string): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(makeFakesurveys()))
    }
  }
  return new LoadSurveysRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveyRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeFakeLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)

  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DB LoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    const accountId = 'any_accountId'
    await sut.load(accountId)
    expect(loadAllSpy).toHaveBeenCalledWith(accountId)
  })

  test('Should a list of surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load('any_accountId')
    expect(surveys).toEqual(makeFakesurveys())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()

    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.load('any_accountId')
    await expect(promise).rejects.toThrow()
  })
})
