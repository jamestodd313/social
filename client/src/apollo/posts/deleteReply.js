import gql from "graphql-tag";

export const DELETE_REPLY = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            body
            comments{
                body
            }
        }
    }
`