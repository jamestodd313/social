const {ApolloServer} = require('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers/resolvers')

const startServer = () => {
    const server = new ApolloServer({typeDefs, resolvers})
    server.listen({port: 5000}).then(()=> console.log("Apollo Server started at http://localhost:5000"))
}

module.exports = startServer