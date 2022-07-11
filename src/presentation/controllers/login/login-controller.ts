import { badRequest, serverError, successResponse, unauthorized } from '@/presentation/helpers/http/http-helpers'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  Authentication
} from './login-controller-protocols'

export class LoginController implements Controller {
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor (authentication: Authentication, validation: Validation) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body

      const authenticationParams = await this.authentication.auth({
        email,
        password
      })
      if (!authenticationParams) {
        return unauthorized()
      }

      return successResponse(authenticationParams)
    } catch (error) {
      return serverError(error)
    }
  }
}
