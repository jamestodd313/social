import { useState } from "react"
import { Button, ButtonContent, Icon, Modal, ModalActions, ModalHeader } from "semantic-ui-react"

export const ShareButton = ({id}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const handleShare = ()=> {
        console.log(`sharing post ${id}`)
    }
    return (
        <>
        <Button color="violet" animated="vertical" onClick={e=> setModalOpen(!modalOpen)} style={{marginBottom: 3, minWidth: 75}}>
            <ButtonContent visible>
                <Icon name="share square outline"/>
            </ButtonContent>
            <ButtonContent hidden>
                Share
            </ButtonContent>
        </Button>
        <Modal open={modalOpen}>
            <ModalHeader>Share Post</ModalHeader>
            <ModalActions>
                <Button icon size="massive" color="twitter">
                    <Icon name="twitter"/>
                </Button>
                <Button icon size="massive" color="linkedin">
                    <Icon name="linkedin"/>
                </Button>
                <Button icon size="massive" color="green">
                    <Icon name="chat"/>
                </Button>
                <Button icon size="massive" color="google plus">
                    <Icon name="mail"/>
                </Button>
                <Button size="massive" color="youtube" onClick={e=> setModalOpen(false)}>
                    Cancel
                </Button>
            </ModalActions>
        </Modal>
        </>
    )
}
