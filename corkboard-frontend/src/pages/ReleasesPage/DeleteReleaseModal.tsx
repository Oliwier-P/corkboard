import Modal from "../../components/ui/Modal/Modal.tsx";
import {Button} from "../../components/ui/Button/Button.tsx";

type DeleteReleaseModalProps = {
    onClose: () => void;
    releaseName: string
    onDelete: () => void;
}

export const DeleteReleaseModal = ({releaseName, onClose, onDelete}: DeleteReleaseModalProps) => {
    return (
        <Modal onClose={onClose}>
            <Modal.Header title="Delete Release:">
                {releaseName}
            </Modal.Header>
            <Modal.Body>
                Are you sure that you want to delete this release?<br/>
                (All tasks assinged to this
                release will be moved to the backlog)
            </Modal.Body>
            <Modal.Footer>
                <Button color="red" onClick={onDelete}>
                    Delete
                </Button>
                <Button color="secondary" onClick={onClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}