import gql from "graphql-tag"

export const LIKE_POST = gql`
mutation likePost($postId: ID!){
    likePost(postId: $postId){
        id
        likeCount
        likes{
            id
            username
        }
    }
}
`