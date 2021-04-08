import gql from 'graphql-tag'

export const CREATE_POST = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id
            body
            createdAt
            user{
                username
            }
        }
    }
`