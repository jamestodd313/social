import {useEffect, useState} from 'react'
import { Form, FormButton, FormGroup, FormInput } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client'

export const PostForm = () => {
    const [postBody, setPostBody] = useState('')
    const [errors, setErrors] = useState(false)
    const [createPost, {loading, error}] = useMutation(CREATE_POST, {
        variables: {body: postBody},
        onError(err){
            console.error(err)
            setErrors(true)
        },
        onCompleted(res){
            console.log(res)
            setPostBody('')
            setErrors(false)
        },
    })
    const handleSubmit = ()=> {
        createPost(postBody)
        .then(response=>{
            console.log(response)
        })
        .catch(err=>{
            console.error(err)
        })
    }
    return (
        <Form onSubmit={handleSubmit} autoComplete="off">
            <FormGroup>
                <FormInput error={errors} id="new-post" type="text" label="Say something..." labelPosition="left corner" width={15} value={postBody} onChange={e=> setPostBody(e.target.value)}/>
                <FormButton primary id="post-button" style={{marginTop: 24}} disabled={loading}>Post</FormButton>
            </FormGroup>
        </Form>
    )
}


const CREATE_POST = gql`
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