import { AddSurveyModel } from '@/domain/usecases/surveys/add-survey'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
