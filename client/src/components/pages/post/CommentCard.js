import { useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Comment, CommentAction, CommentActions, CommentAuthor, CommentAvatar, CommentContent, CommentMetadata, CommentText } from 'semantic-ui-react'
import { DELETE_REPLY } from '../../../apollo/posts/deleteReply'
import { FETCH_POST } from '../../../apollo/posts/fetchPost'
import { AuthContext } from '../../context/auth'

export const CommentCard = ({comment, postId}) => {
    const authctx = useContext(AuthContext)
    const isOwnComment = ()=>{
        return authctx.user.username === comment.user.username
    }
    const [deleteComment, {loading}] = useMutation(DELETE_REPLY, {
        variables: {postId: postId, commentId: comment.id},
        update(proxy, result){
            let cachedPost = proxy.readQuery({
                query: FETCH_POST,
                variables: {postId: postId}
            })
            proxy.writeQuery({
                query: FETCH_POST,
                variables: {postId: postId},
                data: {
                    getPost: {...cachedPost.getPost, comments: result.data.deleteComment.comments}
                }
            })
        },
        onError(err){
            console.error(err)
        },
        onCompleted(post){
            console.log(post)
        }
    })
    const handleDelete = ()=> {
        deleteComment(postId, comment.commentId)
    }
    return (
        <Comment style={{marginTop: 14, paddingTop: 14, borderTop: '1px solid #cecece'}}>
            {loading ? '...' : (
                <>
                <CommentAvatar src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"/>
                    <CommentContent>
                    <CommentAuthor as={Link} to={`/users/${comment.user.username}`}>{comment.user.username}</CommentAuthor>
                    <CommentMetadata>{dayjs(comment.createdAt).fromNow()}</CommentMetadata>
                    <CommentText>{comment.body}</CommentText>
                    <CommentActions style={{marginTop: 14}}>
                        {isOwnComment() ? <CommentAction onClick={handleDelete}>Delete Comment</CommentAction> : <CommentAction>Block User</CommentAction>}
                    </CommentActions>
                </CommentContent>
            </>
            )}
            
        </Comment>
    )
}
