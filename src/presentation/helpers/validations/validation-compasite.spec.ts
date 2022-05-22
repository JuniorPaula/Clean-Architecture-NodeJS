import { MissingParamsError } from '../../errors'
import { Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  test('Should returns an error if any validation fails', async () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamsError('field')
      }
    }

    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamsError('field'))
  })
})
