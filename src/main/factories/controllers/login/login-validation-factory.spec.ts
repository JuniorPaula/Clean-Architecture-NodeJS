import { makeLoginValidation } from './login-validation-factory'
import {
  EmailValidation,
  ValidationComposite,
  RequiredFieldValidation
} from '@/validations/validator'
import { EmailValidator } from '@/validations/protocols/email-validator'
import { Validation } from '@/presentation/protocols/validation'

jest.mock('../../../../validations/validator/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', async () => {
    makeLoginValidation()
    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
