import {gql} from "@apollo/client";

export const FETCH_POST = gql`
    query($postId: String!){
        getPost(postId: $postId){
            id
            body
            createdAt
            user{
                id
                username
            }
            likeCount
            likes{
                id
                createdAt
                user{
                    id
                    username
                }
            }
            commentCount
            comments{
                id
                body
                createdAt
                user{
                    id
                    username
                }
            }
        }
    }
`