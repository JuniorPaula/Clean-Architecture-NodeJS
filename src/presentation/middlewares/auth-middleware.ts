import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDeniedError } from '../errors'
import { forbidden, successResponse } from '../helpers/http/http-helpers'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  private readonly loadAccountByToken: LoadAccountByToken

  constructor (loadAccountByToken: LoadAccountByToken) {
    this.loadAccountByToken = loadAccountByToken
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)
      if (account) {
        return successResponse({ accountId: account.id })
      }
    }
    return forbidden(new AccessDeniedError())
  }
}
