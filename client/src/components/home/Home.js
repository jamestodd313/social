import React, { useEffect, useState } from 'react'
import { FETCH_POSTS_QUERY } from '../../apollo/posts/fetchPosts'
import { useQuery } from '@apollo/client';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';
import { Post } from '../common/Post';
export const Home = () => {
    const [posts, setPosts] = useState(undefined)
    const {loading, data} = useQuery(FETCH_POSTS_QUERY)

    useEffect(()=>{
        if(data) setPosts(data.getPosts)
    },[data])

    return (
        <Grid columns={3}>
            <GridRow><h1>News Feed</h1></GridRow>
            <GridRow>
                {loading ? "Loading..." : !posts ? "No posts to show" : posts.map(post=> (        
                    <GridColumn key={post.id} style={{marginBottom: 24}}>
                        <Post post={post}/>
                    </GridColumn>
                ))}
            </GridRow>
            
        </Grid>
    )
}
