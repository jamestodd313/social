import { useMutation } from "@apollo/client"
import { useContext, useEffect, useState } from "react"
import { Button, ButtonContent, Icon } from "semantic-ui-react"
import { LIKE_POST } from "../../../apollo/posts/likePost"
import { AuthContext } from "../../context/auth"

export const LikeButton = ({likes, likeCount, id}) => {
    const {user} = useContext(AuthContext)
    const [liked, setLiked] = useState(false)

    const [likePost, {loading}] = useMutation(LIKE_POST, {
        variables: {
            postId: id
        },
        onError(err){
            console.error(err)
        }
    })



    useEffect(()=>{
        if(user && likes.find(like=> like.user.username === user.username)) setLiked(true)
        else setLiked(false)
    }, [user, likes])

    const handleLike = ()=> {
        if(!user) window.location="/login"
        else likePost()
    }
    return (
        <Button color="pink" animated="vertical" onClick={handleLike} style={{marginBottom: 3, minWidth: 75}}>
            <ButtonContent visible>
                <Icon name={!liked ? "heart outline" : "heart"}/>
                {likeCount}
            </ButtonContent>
            <ButtonContent hidden>
                {loading ? '•••' : liked ? 'Liked' : 'Like'}
            </ButtonContent>
        </Button>
    )
}


