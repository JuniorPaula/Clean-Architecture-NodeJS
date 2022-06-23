import { LoadSurveysController } from '../../../../presentation/controllers/survey/load-survey/load-survey-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbLoadSurvey } from '../../usecase/load-survey/db-load-survey'

export const makeLoadSurveyController = (): Controller => {
  return makeLogControllerDecorator(
    new LoadSurveysController(makeDbLoadSurvey())
  )
}
