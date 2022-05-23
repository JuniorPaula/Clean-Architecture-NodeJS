import { LoadAccountByEmailRepository } from '../../protocols/load-acccount-by-email-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

describe('Db Authentication Usecase', () => {
  class LoadAccountByEmailRepositorystub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      const account: AccountModel = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'

      }
      return await new Promise(resolve => resolve(account))
    }
  }

  const loadAccountByEmailRepositorystub = new LoadAccountByEmailRepositorystub()

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const sut = new DbAuthentication(loadAccountByEmailRepositorystub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositorystub, 'load')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
