import { Button, ButtonContent, Icon } from "semantic-ui-react"
export const BlockButton = ({userToBlock}) => {
    const handleBlock = ()=> {
        // if(!authctx.user) window.location="/login"
        console.log(`blocking ${userToBlock.username}`)
    }

    return (
        <Button color="red" animated="vertical" onClick={handleBlock} style={{marginBottom: 3, minWidth: 75}}>
            <ButtonContent visible>
                <Icon name="ban"/>
            </ButtonContent>
            <ButtonContent hidden>
                Block
            </ButtonContent>
        </Button>    
    )
}
