import { noContent, serverError, successResponse } from '../../../helpers/http/http-helpers'
import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-survey-controller-protocols'

export class LoadSurveysController implements Controller {
  private readonly loadSurvey: LoadSurveys
  constructor (loadSurvey: LoadSurveys) {
    this.loadSurvey = loadSurvey
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurvey.load()
      return surveys.length ? successResponse(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
