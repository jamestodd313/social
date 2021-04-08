import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { Button, ButtonContent, Card, CardContent, CardDescription, CardHeader, CardMeta, Confirm, Icon, Image } from 'semantic-ui-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {useMutation} from '@apollo/client'
import {AuthContext} from '../context/auth'
import { DELETE_POST } from '../../apollo/posts/deletePost'
import { FETCH_POSTS_QUERY } from '../../apollo/posts/fetchPosts'
dayjs.extend(relativeTime)

export const Post = ({post: {id, body, createdAt, user, likes, likeCount, comments, commentCount}}) => {
    let liked
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [deletePost] = useMutation(DELETE_POST, {
        variables: {postId: id},
        update(proxy, result){
            const cachedPosts = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            const updatedPosts = cachedPosts.getPosts.filter(post=> post.id !== id)
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [...updatedPosts]
                }
            })
        },
        onError(err){
            console.error(err)
        },
        onCompleted(result){
            setConfirmOpen(false)
        }
    })
    const handleLike = ()=> {
        console.log(`liking post ${id}`)
    }
    const handleShare = ()=> {
        console.log(`sharing post ${id}`)
    }
    const handleBlock = ()=> {
        console.log(`blocking ${user.username}`)
    }
    const handleDelete = ()=> { 
        deletePost(id)
    }
    const authctx = useContext(AuthContext)
    const isOwnPost = ()=> authctx.user && user.username === authctx.user.username
    return (
        <Card fluid >
            <CardContent>
                <Image as={Link} to={`/users/${user.username}`} floated="left" size="mini" src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"/>
                <CardHeader as={Link} to={`/users/${user.username}`}>{user.username}</CardHeader>
                <CardMeta as={Link} to={`/post/${id}`}>{dayjs(createdAt).fromNow()}</CardMeta>
                <CardDescription>
                    {body}
                </CardDescription>
            </CardContent>
            <CardContent extra style={{textAlign: 'center'}}> 
                <Button color="pink" animated="vertical" onClick={handleLike} style={{marginBottom: 3, minWidth: 75}}>
                    <ButtonContent visible>
                        <Icon name={!liked ? "heart outline" : "heart filled"}/>
                        {likeCount}
                    </ButtonContent>
                    <ButtonContent hidden>
                        Like
                    </ButtonContent>
                </Button>
                <Button color="twitter" animated="vertical" as={Link} to={`/posts/${id}`} style={{marginBottom: 3, minWidth: 75}}>
                    <ButtonContent visible>
                        <Icon name="comment alternate outline"/>
                        {commentCount}
                    </ButtonContent>
                    <ButtonContent hidden>
                        Reply
                    </ButtonContent>
                </Button>
                <Button color="violet" animated="vertical" onClick={handleShare} style={{marginBottom: 3, minWidth: 75}}>
                    <ButtonContent visible>
                        <Icon name="share square outline"/>
                    </ButtonContent>
                    <ButtonContent hidden>
                        Share
                    </ButtonContent>
                </Button>
                {
                    isOwnPost() ? (
                        <>
                        <Button color="red" animated="vertical" onClick={e=>setConfirmOpen(true)} style={{marginBottom: 3, minWidth: 75}}>
                            <ButtonContent visible>
                                <Icon name="trash alternate outline"/>
                            </ButtonContent>
                            <ButtonContent hidden>
                                Delete
                            </ButtonContent>
                        </Button>
                        <Confirm open={confirmOpen} onCancel={e=>setConfirmOpen(false)} onConfirm={handleDelete}/>
                        </>
                    ) : (
                        <Button color="red" animated="vertical" onClick={handleBlock} style={{marginBottom: 3, minWidth: 75}}>
                            <ButtonContent visible>
                                <Icon name="ban"/>
                            </ButtonContent>
                            <ButtonContent hidden>
                                Block
                            </ButtonContent>
                        </Button>           
                    )
                }
                
            </CardContent>
        </Card>
    )
}
