import {
  LoadSurveys,
  LoadSurveyRepository,
  SurveyModel
} from './db-load-surveys-protocols'

export class DbLoadSurveys implements LoadSurveys {
  private readonly loadSurveyRepository: LoadSurveyRepository
  constructor (loadSurveyRepository: LoadSurveyRepository) {
    this.loadSurveyRepository = loadSurveyRepository
  }

  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveyRepository.loadAll()
    return surveys
  }
}
