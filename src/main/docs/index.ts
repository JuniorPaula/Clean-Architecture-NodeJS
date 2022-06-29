import { loginPath } from './paths/login-path'
import { badRequest, serverError, unauthorizedError, notFoundError } from './components'
import { accountSchema } from './schemas/account-schema'
import { errorSchema } from './schemas/error-schema'
import { loginParamsSchema } from './schemas/login-params-schema'

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
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    login: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    unauthorizedError,
    serverError,
    notFoundError
  }
}
