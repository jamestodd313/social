import { Link } from "react-router-dom"
import { Button, ButtonContent, Icon } from "semantic-ui-react"
export const ReplyButton = ({id, commentCount}) => {
    return (
        <Button color="twitter" animated="vertical" as={Link} to={`/posts/${id}`} style={{marginBottom: 3, minWidth: 75}}>
            <ButtonContent visible>
                <Icon name="comment alternate outline"/>
                {commentCount}
            </ButtonContent>
            <ButtonContent hidden>
                Reply
            </ButtonContent>
        </Button>
    )
}
