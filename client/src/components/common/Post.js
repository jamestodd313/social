import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { Button, ButtonContent, Card, CardContent, CardDescription, CardHeader, CardMeta, Confirm, Icon, Image } from 'semantic-ui-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {useMutation} from '@apollo/client'
import {AuthContext} from '../context/auth'
import { DELETE_POST } from '../../apollo/posts/deletePost'
import { FETCH_POSTS_QUERY } from '../../apollo/posts/fetchPosts'
import { LikeButton } from './buttons/LikeButton'
import { ReplyButton } from './buttons/ReplyButton'
import { ShareButton } from './buttons/ShareButton'
import { DeletePostButton } from './buttons/DeletePostButton'
import { BlockButton } from './buttons/BlockButton'
dayjs.extend(relativeTime)

export const Post = ({post: {id, body, createdAt, user, likes, likeCount, comments, commentCount}}) => {
    let liked
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
                <LikeButton id={id} liked={liked} likeCount={likeCount}/>
                <ReplyButton id={id} commentCount={commentCount}/>
                <ShareButton id={id}/>
                { isOwnPost() ? <DeletePostButton id={id}/> : <BlockButton userToBlock={user}/> }
            </CardContent>
        </Card>
    )
}
