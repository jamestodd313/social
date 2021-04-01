const {ApolloServer, PubSub} = require('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers/resolvers')
const pubsub = new PubSub()
const startServer = () => {
    const server = new ApolloServer({typeDefs, resolvers, context: ({req}) => ({req, pubsub}) })
    server.listen({port: 5000}).then(()=> console.log("Apollo Server started at http://localhost:5000"))
}

module.exports = startServer