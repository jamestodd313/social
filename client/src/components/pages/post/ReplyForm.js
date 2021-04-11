import { useMutation } from '@apollo/client'
import {useState} from 'react'
import { Form, FormButton, FormGroup, FormInput } from 'semantic-ui-react'
import {REPLY_TO_POST} from '../../../apollo/posts/replyToPost'
export const ReplyForm = ({postId}) => {
    const [replyBody, setReplyBody] = useState('')
    const [error, setError] = useState(false)
    const [createComment, {loading}] = useMutation(REPLY_TO_POST, {
        variables: {postId, body: replyBody},
        onError(err){
            setError(true)
        },
        onComplete(){
            setError(false)
        }
    })
    const handleReply = (e)=> {
        e.preventDefault()
        createComment()
    }
    const handleInput = (e)=> {
        setError(false)
        setReplyBody(e.target.value)
    }
    return (
        <Form onSubmit={e=> handleReply(e)}>
            <FormGroup id="reply-form" inline={true}>
                <FormInput error={error} width={16} value={replyBody} onChange={handleInput}/>
                <FormButton>{ loading ? '•••' : 'Send'}</FormButton>
            </FormGroup>
        </Form>
    )
}
