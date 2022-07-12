import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-survey-controller-protocols'
import { noContent, serverError, successResponse } from '@/presentation/helpers/http/http-helpers'

export class LoadSurveysController implements Controller {
  private readonly loadSurvey: LoadSurveys
  constructor (loadSurvey: LoadSurveys) {
    this.loadSurvey = loadSurvey
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurvey.load(httpRequest.accountId)
      return surveys.length ? successResponse(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
