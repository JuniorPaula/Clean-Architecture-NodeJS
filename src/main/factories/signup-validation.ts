import { RequiredFieldValidation } from '../../presentation/helpers/validations/required-field-validation'
import { Validation } from '../../presentation/helpers/validations/validation'
import { ValidationComposite } from '../../presentation/helpers/validations/validation-composite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
