import { Button, ButtonContent, Icon } from "semantic-ui-react"

export const LikeButton = ({liked, likeCount, id}) => {
    const handleLike = ()=> {
        // if(!authctx.user) window.location="/login"
        console.log(`liking post ${id}`)
    }
    return (
        <Button color="pink" animated="vertical" onClick={handleLike} style={{marginBottom: 3, minWidth: 75}}>
            <ButtonContent visible>
                <Icon name={!liked ? "heart outline" : "heart filled"}/>
                {likeCount}
            </ButtonContent>
            <ButtonContent hidden>
                Like
            </ButtonContent>
        </Button>
    )
}
