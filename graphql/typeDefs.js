const gql = require('graphql-tag')

const typeDefs = gql`
    type User{
        id: ID!,
        username: String!,
        email: String!,
        token: String!,
        createdAt: String!
    }
    type Post{
        id: ID!, 
        body: String!,
        username: String!,
        createdAt: String!,
        user: User,
        comments: [Comment]!,
        likes: [Like]!,
        likeCount: Int!,
        commentCount: Int!
    }
    type Comment{
        id: ID!,
        body: String!,
        username: String!,
        createdAt: String!,
        user: User
    }
    type Like{
        id: ID!,
        username: String!,
        createdAt: String!,
        user: User
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
        getPosts: [Post],
        getPost(postId: String!): Post
    }
    type Mutation{
        registerUser(registrationInput: RegistrationInput): User!,
        signIn(loginInfo: LoginInfo): User!
        createPost(body: String!): Post
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post
        deleteComment(postId: ID!, commentId: ID!): Post
        likePost(postId: ID!): Post
    }
    type Subscription{
        getNewPost: Post!
    }
`
module.exports = typeDefs