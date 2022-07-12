import {
  LoadAccountByToken,
  LoadAccountByTokenRepository,
  AccountModel,
  Decrypter
} from './db-load-account-by-token-protocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  private readonly decrypter: Decrypter
  private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository

  constructor (decrypter: Decrypter, loadAccountByTokenRepository: LoadAccountByTokenRepository) {
    this.decrypter = decrypter
    this.loadAccountByTokenRepository = loadAccountByTokenRepository
  }

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    let token: string
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
