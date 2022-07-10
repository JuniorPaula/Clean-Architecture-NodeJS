import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './swagger-confg'
import setupStaticFile from './static-file'

const app = express()
setupStaticFile(app)
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
export { app }
