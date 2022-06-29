import { loginPath } from './paths/login-path'
import { surveyPath } from './paths/surveys-path'
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
  apiKeyAuthSchema
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
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    login: loginParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema
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
