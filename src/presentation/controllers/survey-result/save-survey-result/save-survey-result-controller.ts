import { InvalidParamsError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById
} from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  private readonly loadSurveyById: LoadSurveyById
  constructor (loadSurveyById: LoadSurveyById) {
    this.loadSurveyById = loadSurveyById
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body

      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamsError('answer'))
        }
      } else {
        return forbidden(new InvalidParamsError('surveyId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
