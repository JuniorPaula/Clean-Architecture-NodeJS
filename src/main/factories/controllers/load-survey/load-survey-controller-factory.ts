import { LoadSurveysController } from '@/presentation/controllers/survey/load-survey/load-survey-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurvey } from '@/main/factories/usecase/load-survey/db-load-survey'

export const makeLoadSurveyController = (): Controller => {
  return makeLogControllerDecorator(
    new LoadSurveysController(makeDbLoadSurvey())
  )
}
