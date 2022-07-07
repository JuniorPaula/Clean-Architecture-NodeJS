import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveyById } from '../../usecase/save-survey-result/db-load-survey-by-id'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller'
import { makeDbLoadSurveyResult } from '../../usecase/save-survey-result/db-load-survey-result-factory'

export const makeLoadSurveyResultController = (): Controller => {
  return makeLogControllerDecorator(
    new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  )
}
