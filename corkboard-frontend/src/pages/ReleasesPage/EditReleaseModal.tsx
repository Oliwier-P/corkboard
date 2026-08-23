import Modal from "../../components/ui/Modal/Modal";
import { Button } from "../../components/ui/Button/Button.tsx";
import { LabeledInput } from "../../components/ui/LabeledInput/LabeledInput.tsx";
import { type SubmitHandler, useForm } from "react-hook-form";

type EditReleaseModalProps = {
    onSave: (name: string) => void;
    onClose: () => void;
    releaseName: string;
};

type Inputs = {
    name: string;
};

export const EditReleaseModal = ({ onSave, onClose, releaseName }: EditReleaseModalProps) => {
    const { register, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        onSave(data.name);
        onClose();
    };

    return (
        <Modal onClose={onClose}>
            <Modal.Header title="Edit Release">{releaseName}</Modal.Header>
            <Modal.Body>
                <LabeledInput
                    style={{ width: "100%" }}
                    defaultValue={releaseName}
                    label="Name"
                    register={register("name", {
                        required: "You have to enter a release name!",
                    })}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button color="primary" onClick={handleSubmit(onSubmit)}>
                    Save
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
