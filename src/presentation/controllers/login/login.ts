import { MissingParamsError } from '../../errors'
import { badRequest } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamsError('email'))))
    }

    if (!httpRequest.body.password) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamsError('password'))))
    }
  }
}
