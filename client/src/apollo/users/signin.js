import { gql } from "@apollo/client";

export const SIGNIN = gql`
    mutation signIn($email: String!, $password: String!){
        signIn(loginInfo: {email: $email, password: $password}){
            id, token, username, email, createdAt
        }
    }
`