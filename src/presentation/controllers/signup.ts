import { InvalidParamsError, MissingParamsError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helpers'
import { EmailValidator } from '../protocols/email-validator'
import { HttpRequest, HttpResponse, Controller } from '../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfimation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfimation) {
        return badRequest(new InvalidParamsError('passwordConfimation'))
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamsError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
