require('dotenv').config()
const mongoose = require('mongoose')
const {ApolloServer} = require('apollo-server')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
// ======================== MONGO ============================ \\
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> console.log('Connected to MongoDB'))

// ======================= APOLLO =========================== \\
const server = new ApolloServer({typeDefs, resolvers})
server.listen({port: 5000}).then(()=> console.log("Apollo Server started at http://localhost:5000"))