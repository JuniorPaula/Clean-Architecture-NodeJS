import { InvalidParamsError } from '@/presentation/errors'
import { forbidden, serverError, successResponse } from '@/presentation/helpers/http/http-helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  LoadSurveyResult
} from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  private readonly loadSurveyById: LoadSurveyById
  private readonly loadSurveyResult: LoadSurveyResult

  constructor (loadSurveyById: LoadSurveyById, loadSurveyResult: LoadSurveyResult) {
    this.loadSurveyById = loadSurveyById
    this.loadSurveyResult = loadSurveyResult
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamsError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, httpRequest.accountId)
      return successResponse(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
