import React from 'react'
import {Link} from 'react-router-dom'
import { Button, ButtonContent, Card, CardContent, CardDescription, CardHeader, CardMeta, Icon, Image } from 'semantic-ui-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const Post = ({post: {id, body, createdAt, user, likes, likeCount, comments, commentCount}}) => {
    let liked
    const handleLike = ()=> {
        console.log(`liking post ${id}`)
    }
    const handleReply = ()=> {
        console.log(`replying to post ${id}`)
    }
    const handleShare = ()=> {
        console.log(`sharing post ${id}`)
    }
    const handleBlock = ()=> {
        console.log(`blocking ${user.username}`)
    }
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
                <Button color="twitter" animated="vertical" onClick={handleReply} style={{marginBottom: 3, minWidth: 75}}>
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
                <Button color="red" animated="vertical" onClick={handleBlock} style={{marginBottom: 3, minWidth: 75}}>
                    <ButtonContent visible>
                        <Icon name="ban"/>
                    </ButtonContent>
                    <ButtonContent hidden>
                        Block
                    </ButtonContent>
                </Button>
            </CardContent>
        </Card>
    )
}
