import { DbLoadSurveyById } from '@/data/usecase/load-survey-by-id/load-survey-by-id'
import { LoadSurveyById } from '@/domain/usecases/surveys/load-survey-by-id'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveytMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById(surveytMongoRepository)
}
