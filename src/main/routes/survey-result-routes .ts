import { Router } from 'express'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey-result/save-survey-result-controller-factory'
import { adapterRoute } from '@/main/adapters/express-routes-adapter'
import { auth } from '@/main/middlewares/auth'
import { makeLoadSurveyResultController } from '../factories/controllers/survey-result/load-survey-result-controller-factory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adapterRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adapterRoute(makeLoadSurveyResultController()))
}
