export default {
  mongoUrl: process.env.MONGODB_CONNECT_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'hdfb315$%ghrw#55FDsv'
}
