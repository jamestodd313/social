const PostResolvers = require('./posts')
const UserResolvers = require('./users')
const InteractionResolvers = require('./interactions')
const resolvers = {
    Query: {
        ...PostResolvers.Query,
        ...UserResolvers.Query,
        ...InteractionResolvers.Query
    },
    Mutation: {
        ...PostResolvers.Mutation,
        ...UserResolvers.Mutation,
        ...InteractionResolvers.Mutation
    }
}

module.exports = resolvers