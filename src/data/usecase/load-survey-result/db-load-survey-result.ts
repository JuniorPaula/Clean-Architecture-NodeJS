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
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map(answer => Object.assign({}, answer, {
          count: 0,
          percent: 0
        }))
      }
    }
    return surveyResult
  }
}
