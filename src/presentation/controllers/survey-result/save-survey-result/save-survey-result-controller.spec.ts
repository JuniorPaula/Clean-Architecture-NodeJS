import { InvalidParamsError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helpers'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { HttpRequest, LoadSurveyById, SurveyModel } from './save-survey-result-controller-protocols'

const makeFakerequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_surveyId'
  },
  body: {
    answer: 'any_answer'
  }
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return await new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }

  return new LoadSurveyByIdStub()
}

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)

  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('SaveSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakerequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_surveyId')
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(
      new Promise(resolve => resolve(null))
    )
    const httpResponse = await sut.handle(makeFakerequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamsError('surveyId')))
  })

  test('Should returns 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(
      new Promise((_, reject) => reject(new Error()))
    )

    const httpResponse = await sut.handle(makeFakerequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        surveyId: 'any_surveyId'
      },
      body: {
        answer: 'wrong_answer'
      }
    })
    expect(httpResponse).toEqual(forbidden(new InvalidParamsError('answer')))
  })
})
