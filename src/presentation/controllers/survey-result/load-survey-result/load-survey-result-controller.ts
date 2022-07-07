import { InvalidParamsError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers/http/http-helpers'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  private readonly loadSurveyById: LoadSurveyById

  constructor (loadSurveyById: LoadSurveyById) {
    this.loadSurveyById = loadSurveyById
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    if (!survey) {
      return forbidden(new InvalidParamsError('surveyId'))
    }
    return await Promise.resolve(null)
  }
}
