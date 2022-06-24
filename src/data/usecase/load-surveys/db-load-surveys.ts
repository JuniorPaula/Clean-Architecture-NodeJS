import { LoadSurveyRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveys } from '@/domain/usecases/load-surveys'

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
