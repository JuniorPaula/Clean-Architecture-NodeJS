import { MissingParamsError } from '../../errors'
import { badRequest } from '../../helpers/http-helpers'
import { LoginController } from './login'

describe('LoginController', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const HttpResponse = await sut.handle(httpRequest)
    expect(HttpResponse).toEqual(badRequest(new MissingParamsError('email')))
  })
})
