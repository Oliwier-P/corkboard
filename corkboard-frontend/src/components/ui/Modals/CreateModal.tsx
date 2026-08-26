import "./CreateModal.scss";
import Modal from "../Modal/Modal.tsx";
import { Button } from "../Button/Button.tsx";
import { type SubmitHandler, useForm } from "react-hook-form";
import { LabeledInput } from "../LabeledInput/LabeledInput.tsx";

type CreateModalProps = {
    title: string;
    inputLabel?: string;
    buttonLabel?: string;
    requiredMessage?: string;
    onSave: (data: Inputs) => void;
    onClose: () => void;
};

type Inputs = {
    name: string;
};

const CreateModal = ({
    title,
    inputLabel = "Name",
    buttonLabel = "Create",
    requiredMessage = "This field cannot be empty!",
    onClose,
    onSave,
}: CreateModalProps) => {
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        onSave(data);
    };

    return (
        <Modal className="create-modal" onClose={onClose}>
            <Modal.Header title={title} />
            <Modal.Body>
                <LabeledInput
                    style={{ width: "100%" }}
                    defaultValue=""
                    label={inputLabel}
                    register={register("name", {
                        required: requiredMessage,
                    })}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button color="primary" onClick={handleSubmit(onSubmit)}>
                    {buttonLabel}
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateModal;
