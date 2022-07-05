import {
  LoadSurveyResultRepository,
  LoadSurveyResult,
  SurveyResultModel
} from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  private readonly loadSurveyResultRepository: LoadSurveyResultRepository

  constructor (loadSurveyResultRepository: LoadSurveyResultRepository) {
    this.loadSurveyResultRepository = loadSurveyResultRepository
  }

  async load (surveyId: string): Promise<SurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return null
  }
}
