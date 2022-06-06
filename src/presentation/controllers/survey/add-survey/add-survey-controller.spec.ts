import { HttpRequest } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'
import { Validation } from '../../../protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: AddSurveyController
  validationSub: Validation
}

const makeSut = (): SutTypes => {
  const validationSub = makeValidation()
  const sut = new AddSurveyController(validationSub)

  return {
    sut,
    validationSub
  }
}

describe('Add Survey Controller', () => {
  test('Should calls validation with correct values', async () => {
    const { sut, validationSub } = makeSut()
    const validateSpy = jest.spyOn(validationSub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
