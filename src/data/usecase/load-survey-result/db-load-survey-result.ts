import {
  LoadSurveyResultRepository,
  LoadSurveyByIdRepository,
  LoadSurveyResult,
  SurveyResultModel
} from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository

  constructor (
    loadSurveyResultRepository: LoadSurveyResultRepository,
    loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {
    this.loadSurveyResultRepository = loadSurveyResultRepository
    this.loadSurveyByIdRepository = loadSurveyByIdRepository
  }

  async load (surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResult) {
      await this.loadSurveyByIdRepository.loadById(surveyId)
    }
    return surveyResult
  }
}
