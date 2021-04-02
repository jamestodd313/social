import { gql } from "@apollo/client";

export const REGISTER = gql`
    mutation registerUser($email: String!, $username: String!, $password: String!, $confirmPassword: String!){
        registerUser(registrationInput: {email: $email, username: $username, password: $password, confirmPassword: $confirmPassword}){
            id, token, username, email, createdAt
        }
    }
`