const connectDB = require('./mongo/connectDB')
const startServer = require('./graphql/startServer')

connectDB()
startServer()