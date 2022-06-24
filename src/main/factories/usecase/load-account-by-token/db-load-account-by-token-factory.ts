import { DbLoadAccountByToken } from '@/data/usecase/load-account-by-token/db-load-account-by-token'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository()
  const jtwAdapter = new JwtAdapter(env.jwtSecret)
  return new DbLoadAccountByToken(jtwAdapter, accountMongoRepository)
}
