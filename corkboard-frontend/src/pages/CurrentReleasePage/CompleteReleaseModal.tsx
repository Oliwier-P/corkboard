import Modal from "../../components/ui/Modal/Modal.tsx";
import {Button} from "../../components/ui/Button/Button.tsx";

type CompleteReleaseModal = {
    onClose: () => void
    onComplete: () => void
}

export const CompleteReleaseModal = ({onComplete, onClose}: CompleteReleaseModal) => {
    return (
        <Modal onClose={onClose}>
            <Modal.Header>Complete Release</Modal.Header>
            <Modal.Body>
                <span>Are you sure you want to complete Current Release?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onComplete}>Complete Release</Button>
                <Button color="red" onClick={onClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}