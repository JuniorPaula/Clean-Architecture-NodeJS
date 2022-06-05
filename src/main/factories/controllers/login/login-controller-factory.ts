import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '../../../../presentation/protocols'
import { LoginController } from '../../../../presentation/controllers/login/login-controller'
import { makeDbAuthentication } from '../../usecase/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(
    new LoginController(makeDbAuthentication(), makeLoginValidation()))
}
