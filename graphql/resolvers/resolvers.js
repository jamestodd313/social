const PostResolvers = require('./posts')
// const UserResolvers = require('./users')

const resolvers = {
    Query: {
        ...PostResolvers.Query
    },
    // Mutations: {
    //     ...PostResolvers.Mutations
    // }
}

module.exports = resolvers