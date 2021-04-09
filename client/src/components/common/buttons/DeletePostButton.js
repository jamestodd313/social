import { useMutation } from "@apollo/client"
import { useState } from "react"
import { Button, ButtonContent, Icon, Confirm } from "semantic-ui-react"
import { DELETE_POST } from "../../../apollo/posts/deletePost"
import { FETCH_POSTS_QUERY } from "../../../apollo/posts/fetchPosts"

export const DeletePostButton = ({id}) => {
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
    const handleDelete = ()=> { 
        deletePost(id)
    }
    return (
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
    )
}
