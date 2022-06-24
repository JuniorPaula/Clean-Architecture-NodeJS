import { makeSignUpValidation } from './signup-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '@/main/factories/usecase/add-account/db-add-account-factory'
import { makeDbAuthentication } from '@/main/factories/usecase/authentication/db-authentication-factory'
import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  return makeLogControllerDecorator(
    new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication()))
}
