import { AccountModel } from '@/data/usecase/add-account/db-add-account-protocols'

export interface LoadAccountByTokenRepository {
  loadByToken: (token: string, role?: string) => Promise<AccountModel>
}
