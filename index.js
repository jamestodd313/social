const {ApolloServer} = require('apollo-server')
const gql = require('graphql-tag')

require('dotenv').config()
const mongoose = require('mongoose')


// ======================== MONGO ============================ \\
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> console.log('Connected to MongoDB'))


// ======================= APOLLO =========================== \\
const typeDefs = gql`
    type Query{
        testQuery: String
    }
`
const resolvers = {
    Query: {
        testQuery: ()=> 'hello world'
    }
}
const server = new ApolloServer({typeDefs, resolvers})
server.listen({port: 5000}).then(()=> console.log("Apollo Server started at http://localhost:5000"))

