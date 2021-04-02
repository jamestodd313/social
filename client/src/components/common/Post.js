import React from 'react'
import {Link} from 'react-router-dom'
import { Button, ButtonContent, Card, CardContent, CardDescription, CardHeader, CardMeta, GridColumn, Icon, Image } from 'semantic-ui-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const Post = ({post: {id, body, createdAt, user, likes, likeCount, comments, commentCount}}) => {
    let liked
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
            <CardContent extra>
                <Button animated="vertical">
                    <ButtonContent visible>
                        <Icon name={!liked ? "heart outline" : "heart filled"}/>
                        {likeCount}
                    </ButtonContent>
                    <ButtonContent hidden>
                        Like
                    </ButtonContent>
                </Button>
                <Button animated="vertical">
                    <ButtonContent visible>
                        <Icon name="comment alternate outline"/>
                        {commentCount}
                    </ButtonContent>
                    <ButtonContent hidden>
                        Reply
                    </ButtonContent>
                </Button>
            </CardContent>
        </Card>
    )
}
