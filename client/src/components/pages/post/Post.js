import {Card, CardContent, CardDescription, CardHeader, CardMeta, Grid, GridColumn, GridRow, Image} from 'semantic-ui-react'
import { useQuery } from '@apollo/client'
import { FETCH_POST } from '../../../apollo/posts/fetchPost'
import { Link } from 'react-router-dom'
import * as PostCard from '../../common/Post'
import dayjs from 'dayjs'
export const Post = (props) => {
    let {postId} = props.match.params
    const {loading, data: { getPost: post } = {}} = useQuery(FETCH_POST, {
        variables: {
            postId
        },
        onError(err){
            console.log(err)
        }
    })


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
                                    <CardHeader>{post.user.username}</CardHeader>
                                    <CardMeta>{dayjs(post.createdAt).fromNow()}</CardMeta>
                                    <CardDescription>{post.body}</CardDescription>
                                </CardContent>
                            </Card>
                        </GridColumn>
                    </GridRow>
                </Grid>
            )}
        </div>
    )
}


