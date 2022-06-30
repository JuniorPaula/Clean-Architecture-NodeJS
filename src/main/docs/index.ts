import { loginPath } from './paths/login-path'
import { surveyPath } from './paths/surveys-path'
import { signupPath } from './paths/signup-path'
import { surveyResultPath } from './paths/survey-result-path'
import {
  forbiddenError,
  badRequestError,
  serverError,
  unauthorizedError,
  notFoundError
} from './components'
import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  surveyAnswerSchema,
  surveySchema,
  surveysSchema,
  apiKeyAuthSchema,
  signupParamsSchema,
  addSurveyParamsSchema,
  saveSurveyParamschema,
  surveyResultchema
} from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Enquete Node API',
    descriptions: 'API para realizar pesquisa de enquetes',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [
    {
      name: 'Login'
    }, {
      name: 'Enquete'
    }
  ],
  paths: {
    '/login': loginPath,
    '/signup': signupPath,
    '/surveys': surveyPath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
  schemas: {
    account: accountSchema,
    login: loginParamsSchema,
    signup: signupParamsSchema,
    addSurveys: addSurveyParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    saveSurveyParams: saveSurveyParamschema,
    surveyResult: surveyResultchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequestError,
    unauthorizedError,
    serverError,
    notFoundError,
    forbiddenError
  }
}
