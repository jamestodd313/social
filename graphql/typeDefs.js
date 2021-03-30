const gql = require('graphql-tag')

const typeDefs = gql`
    type Post{
        id: ID!,
        body: String!,
        username: String!,
        createdAt: String!,
    }
    type User{
        id: ID!,
        username: String!,
        email: String!,
        token: String!,
        createdAt: String!
    }
    input RegistrationInput{
        username: String!,
        password: String!,
        confirmPassword: String!,
        email: String!,
        createdAt: String,
    }
    input LoginInfo{
        email: String!,
        password: String!
    }
    type Query{
        getPosts: [Post]
    }
    type Mutation{
        registerUser(registrationInput: RegistrationInput): User!,
        signIn(loginInfo: LoginInfo): User!
    }
`
module.exports = typeDefs