import {useEffect, useState} from 'react'
import { Form, FormButton, FormGroup, FormInput } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { FETCH_POSTS_QUERY } from '../../../apollo/posts/fetchPosts'
import { CREATE_POST } from '../../../apollo/posts/createPost'

export const PostForm = () => {
    const [postBody, setPostBody] = useState('')
    const [errors, setErrors] = useState(false)
    const [createPost, {loading, error}] = useMutation(CREATE_POST, {
        variables: {body: postBody},
        update(proxy, result){
            let cachedPosts = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            })
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                  getPosts: [result.data.createPost, ...cachedPosts.getPosts],
                },
            })
        },
        onError(err){
            console.error(err)
            setErrors(err.graphQLErrors[0].message)
        },
        onCompleted(res){
            setPostBody('')
            setErrors(false)
        },
    })
    const handleSubmit = ()=> {
        createPost(postBody)
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