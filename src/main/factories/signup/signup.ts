import { DbAddAccount } from '../../../data/usecase/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { Controller } from '../../../presentation/protocols'
import { LoggerControllerDecorator } from '../../decorators/logs'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12

  /** Dependency ijenctions */
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const logMongoRepository = new LogMongoRepository()

  const signupController =
    new SignUpController(dbAddAccount, makeSignUpValidation())
  return new LoggerControllerDecorator(signupController, logMongoRepository)
}
