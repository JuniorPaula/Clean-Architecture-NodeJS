import { InvalidParamsError } from '@/presentation/errors'
import { forbidden, serverError, successResponse } from '@/presentation/helpers/http/http-helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  SaveSurveyResult
} from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  private readonly loadSurveyById: LoadSurveyById
  private readonly saveSurveyResult: SaveSurveyResult
  constructor (loadSurveyById: LoadSurveyById, saveSurveyResult: SaveSurveyResult) {
    this.loadSurveyById = loadSurveyById
    this.saveSurveyResult = saveSurveyResult
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const { accountId } = httpRequest

      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamsError('answer'))
        }
      } else {
        return forbidden(new InvalidParamsError('surveyId'))
      }
      const surveyResult = await this.saveSurveyResult.save({
        surveyId,
        accountId,
        answer,
        date: new Date()
      })
      return successResponse(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
