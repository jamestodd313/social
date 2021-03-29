require('dotenv').config()
require('./mongo/connectDB')()
require('./graphql/startServer')()