import React, { useContext, useEffect, useState } from 'react'
import { FETCH_POSTS_QUERY } from '../../../apollo/posts/fetchPosts'
import { useQuery } from '@apollo/client';
import { Grid, GridRow, GridColumn, TransitionGroup } from 'semantic-ui-react';
import { Post } from '../../common/Post';
import {AuthContext} from '../../context/auth'
import { PostForm } from './PostForm';
export const Home = () => {
    const [posts, setPosts] = useState(undefined)
    const {loading, data} = useQuery(FETCH_POSTS_QUERY)
    const {user: currentUser} = useContext(AuthContext)


    useEffect(()=>{
        if(data) setPosts(data.getPosts)
    },[data])

    return (
        <Grid columns={3} stackable style={{margin: 0}}>
            <GridRow centered><h1>{currentUser ? `Hi, ${currentUser.username}` : 'Recent Posts'}</h1></GridRow>
            {
                currentUser ? (
                    <GridRow columns={1}>
                        <GridColumn style={{padding: 14}}>
                            <PostForm/>
                        </GridColumn>
                    </GridRow>
                ) : null
            }
            <GridRow>
                {loading ? "Loading..." : !posts ? "No posts to show" : (
                    <TransitionGroup>
                        {
                            posts.map(post=> (        
                                <GridColumn key={post.id} style={{marginBottom: 24}}>
                                    <Post post={post}/>
                                </GridColumn>
                            ))
                        }
                    </TransitionGroup>
                )}
            </GridRow>
            
        </Grid>
    )
}
