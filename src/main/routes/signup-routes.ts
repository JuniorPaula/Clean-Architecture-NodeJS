import { Router } from 'express'
import { adapterRoute } from '../adapters/express-routes-adapter'
import { makeSignUpController } from '../factories/signup/signup'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpController()))
}
