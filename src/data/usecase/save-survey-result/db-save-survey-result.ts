import {
  SaveSurveyResult,
  SaveSurveyResultModel,
  SurveyResultModel,
  SaveSurveyResultRepository
} from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  private readonly saveSurveyResultRepository: SaveSurveyResultRepository

  constructor (saveSurveyResultRepository: SaveSurveyResultRepository) {
    this.saveSurveyResultRepository = saveSurveyResultRepository
  }

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    return null
  }
}
