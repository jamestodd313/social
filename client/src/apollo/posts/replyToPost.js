import gql from "graphql-tag";

export const REPLY_TO_POST = gql`
    mutation createComment($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body){
            id
            body
            comments{
                id
                body
                createdAt
                user{
                    username
                }
            }
        }
    }
`