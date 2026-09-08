import "./ConfirmationModal.scss";
import Modal from "@/ui//Modal/Modal.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import type { ReactNode } from "react";
import type { ButtonColorsType } from "@/types/ButtonColorsType.ts";

type ConfirmationModalProps = {
    title: string;
    subtitle?: string;
    message: ReactNode;
    confirmButtonLabel?: string;
    confirmButtonColor?: ButtonColorsType;
    onDelete: () => void;
    onClose: () => void;
};

const ConfirmationModal = ({
    title,
    subtitle,
    message,
    confirmButtonLabel = "Delete",
    confirmButtonColor = "red",
    onClose,
    onDelete,
}: ConfirmationModalProps) => {
    return (
        <Modal className="confirmation-modal" onClose={onClose}>
            <Modal.Header title={title}>{subtitle}</Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button color={confirmButtonColor} onClick={onDelete}>
                    {confirmButtonLabel}
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
