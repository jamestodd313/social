import { Button, ButtonContent, Icon } from "semantic-ui-react"

export const ShareButton = ({id}) => {
    const handleShare = ()=> {
        console.log(`sharing post ${id}`)
    }
    return (
        <Button color="violet" animated="vertical" onClick={handleShare} style={{marginBottom: 3, minWidth: 75}}>
            <ButtonContent visible>
                <Icon name="share square outline"/>
            </ButtonContent>
            <ButtonContent hidden>
                Share
            </ButtonContent>
        </Button>
    )
}
