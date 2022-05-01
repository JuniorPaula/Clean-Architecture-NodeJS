import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    console.info('[+] Mongodb is connected.')

    const { app } = (await import('./config/app'))
    app.listen(env.port, () => console.info(`[+] Server is running on port ${env.port}`))
  })
  .catch(console.error)
