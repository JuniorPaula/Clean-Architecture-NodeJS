import { successResponse } from '../../../helpers/http/http-helpers'
import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-survey-controller-protocols'

export class LoadSurveysController implements Controller {
  private readonly loadSurvey: LoadSurveys
  constructor (loadSurvey: LoadSurveys) {
    this.loadSurvey = loadSurvey
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurvey.load()
    return successResponse(surveys)
  }
}
