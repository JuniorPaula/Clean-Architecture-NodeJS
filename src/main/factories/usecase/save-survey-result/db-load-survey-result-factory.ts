import { DbLoadSurveyResult } from '@/data/usecase/load-survey-result/db-load-survey-result'
import { LoadSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-reault-mongo-reposiotory'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyMongoRepository = new SurveyMongoRepository()
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
