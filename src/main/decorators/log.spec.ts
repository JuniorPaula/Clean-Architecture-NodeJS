import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LoggerControllerDecorator } from './logs'

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
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
    const controllerStub = new ControlerStub()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const sut = new LoggerControllerDecorator(controllerStub)

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
