const PostResolvers = require('./posts')
const UserResolvers = require('./users')

const resolvers = {
    Query: {
        ...PostResolvers.Query,
        ...UserResolvers.Query
    },
    Mutation: {
        ...PostResolvers.Mutation,
        ...UserResolvers.Mutation
    }
}

module.exports = resolvers