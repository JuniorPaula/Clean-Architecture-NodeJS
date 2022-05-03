import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LoggerControllerDecorator } from './logs'

interface sutTypes {
  sut: LoggerControllerDecorator
  controllerStub: Controller
}

const makeController = (): Controller => {
  class ControlerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'any_name'
        }
      }

      return await new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControlerStub()
}

const makeSut = (): sutTypes => {
  const controllerStub = makeController()
  const sut = new LoggerControllerDecorator(controllerStub)

  return {
    sut,
    controllerStub
  }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
