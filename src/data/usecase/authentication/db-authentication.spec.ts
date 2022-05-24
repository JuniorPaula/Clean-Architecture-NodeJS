import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { HashComparer } from '../../protocols/cryptograthy/hash-comparer'
import { TokenGenerator } from '../../protocols/cryptograthy/token-generator'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-acccount-by-email-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbAuthentication } from './db-authentication'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositorystub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByEmailRepositorystub()
}

const makeHashComparerStub = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }

  return new HashComparerStub()
}

const makeTokenGerenatorStub = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (id: string): Promise<string> {
      return await new Promise(resolve => resolve('any_token'))
    }
  }

  return new TokenGeneratorStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositorystub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  tokenGerenatorStub: TokenGenerator

}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorystub = makeLoadAccountByEmailRepositoryStub()
  const hashComparerStub = makeHashComparerStub()
  const tokenGerenatorStub = makeTokenGerenatorStub()

  const sut = new DbAuthentication(
    loadAccountByEmailRepositorystub,
    hashComparerStub,
    tokenGerenatorStub
  )

  return {
    sut,
    loadAccountByEmailRepositorystub,
    hashComparerStub,
    tokenGerenatorStub
  }
}

describe('Db Authentication Usecase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorystub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositorystub, 'load')
    await sut.auth(makeFakeAuthentication())

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorystub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorystub, 'load').mockReturnValueOnce(
      new Promise((_, reject) => reject(new Error()))
    )
    const promise = sut.auth(makeFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorystub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorystub, 'load').mockReturnValueOnce(null)
    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const comparerSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAuthentication())

    expect(comparerSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(
      new Promise((_, reject) => reject(new Error()))
    )
    const promise = sut.auth(makeFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(
      new Promise(resolve => resolve(false))
    )
    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  test('Should call TokenGerenator with correct id', async () => {
    const { sut, tokenGerenatorStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGerenatorStub, 'generate')
    await sut.auth(makeFakeAuthentication())

    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if TokenGerenator throws', async () => {
    const { sut, tokenGerenatorStub } = makeSut()
    jest.spyOn(tokenGerenatorStub, 'generate').mockReturnValueOnce(
      new Promise((_, reject) => reject(new Error()))
    )
    const promise = sut.auth(makeFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })

  test('Should DbAuthetication returns a token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })
})
