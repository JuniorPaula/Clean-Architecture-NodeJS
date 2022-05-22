import { MissingParamsError } from '../../errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequireField Validation', () => {
  test('Should returns a MinssingParamError if validation fails', async () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamsError('field'))
  })
})
