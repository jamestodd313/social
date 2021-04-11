import {Card, CardContent, CardDescription, CardHeader, CardMeta, CommentGroup, Grid, GridColumn, GridRow, Image} from 'semantic-ui-react'
import { useQuery } from '@apollo/client'
import { FETCH_POST } from '../../../apollo/posts/fetchPost'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { LikeButton } from '../../common/buttons/LikeButton'
import { ShareButton } from '../../common/buttons/ShareButton'
import { DeletePostButton } from '../../common/buttons/DeletePostButton'
import { BlockButton } from '../../common/buttons/BlockButton'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth'
import { CommentCard } from './CommentCard'
import { ReplyForm } from './ReplyForm'
export const Post = (props) => {
    let {postId} = props.match.params
    const authctx = useContext(AuthContext)
    const {loading, data: { getPost: post } = {}} = useQuery(FETCH_POST, {
        variables: {
            postId
        },
        onError(err){
            console.log(err)
        }
    })

    const isOwnPost = ()=> authctx.user && post.user.username === authctx.user.username
    return (
        <div>
            {loading ? "Loading..." : !post ? "Post not found" : (
                <Grid columns={16} stackable style={{margin: 0}}>
                    <GridRow>
                        <GridColumn width={2}>
                            <Image as={Link} to={`/users/${post.user.username}`} floated="left" size="small" src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"/>
                        </GridColumn>
                        <GridColumn width={14}>
                            <Card fluid>
                                <CardContent>
                                    <CardHeader as={Link} to={`/users/${post.user.username}`}>{post.user.username}</CardHeader>
                                    <CardMeta>{dayjs(post.createdAt).fromNow()}</CardMeta>
                                    <CardDescription>{post.body}</CardDescription>
                                </CardContent>
                                <CardContent extra style={{textAlign: 'right'}}>
                                    <LikeButton id={post.id} likes={post.likes} likeCount={post.likeCount}/>
                                    <ShareButton id={post.id}/>
                                    { isOwnPost() ? <DeletePostButton id={post.id}/> : <BlockButton userToBlock={post.user}/> }
                                </CardContent>
                            </Card>
                        </GridColumn>
                    </GridRow>
                    <GridRow>
                        <GridColumn width={14} floated="right">
                            <h2>Join The Conversation</h2>
                            <ReplyForm postId={postId}/>
                            
                            <CommentGroup style={{marginTop: 28, marginRight: 0, maxWidth: '100vw'}}>
                                <h3>More Replies</h3>
                                {post.comments.length > 0 ? post.comments.map(comment=> <CommentCard style={{width: '100%'}} postId={post.id} key={comment.id} comment={comment}/>) : <center>No Replies Yet</center>}
                            </CommentGroup>

                        </GridColumn>
                    </GridRow>
                </Grid>
            )}
        </div>
    )
}


