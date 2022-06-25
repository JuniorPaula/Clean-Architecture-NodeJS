import {
  LoadSurveyById,
  LoadSurveyByIdRepository,
  SurveyModel
} from './load-survey-by-id-protocols'

export class DbLoadSurveyById implements LoadSurveyById {
  private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository

  constructor (loadSurveyByIdRepository: LoadSurveyByIdRepository) {
    this.loadSurveyByIdRepository = loadSurveyByIdRepository
  }

  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey
  }
}
