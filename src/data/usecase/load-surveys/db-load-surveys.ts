import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveys } from '../../../domain/usecases/load-surveys'
import { LoadSurveyRepository } from '../../protocols/db/survey/load-survey-repository'

export class DbLoadSurveys implements LoadSurveys {
  private readonly loadSurveyRepository: LoadSurveyRepository
  constructor (loadSurveyRepository: LoadSurveyRepository) {
    this.loadSurveyRepository = loadSurveyRepository
  }

  async load (): Promise<SurveyModel[]> {
    await this.loadSurveyRepository.loadAll()
    return []
  }
}
