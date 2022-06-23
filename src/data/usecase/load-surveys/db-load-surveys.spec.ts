import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveyRepository } from '../../protocols/db/survey/load-survey-repository'
import { DbLoadSurveys } from './db-load-surveys'

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
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(makeFakesurveys()))
    }
  }
  return new LoadSurveysRepositoryStub()
}

interface SutTypes {
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
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
