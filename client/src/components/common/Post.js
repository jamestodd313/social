import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from 'semantic-ui-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {AuthContext} from '../context/auth'
import { LikeButton } from './buttons/LikeButton'
import { ReplyButton } from './buttons/ReplyButton'
import { ShareButton } from './buttons/ShareButton'
import { DeletePostButton } from './buttons/DeletePostButton'
import { BlockButton } from './buttons/BlockButton'
dayjs.extend(relativeTime)

export const Post = ({post: {id, body, createdAt, user, likeCount, likes, commentCount}}) => {
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
                <LikeButton id={id} likes={likes} likeCount={likeCount}/>
                <ReplyButton id={id} commentCount={commentCount}/>
                <ShareButton id={id}/>
                { isOwnPost() ? <DeletePostButton id={id}/> : <BlockButton userToBlock={user}/> }
            </CardContent>
        </Card>
    )
}
