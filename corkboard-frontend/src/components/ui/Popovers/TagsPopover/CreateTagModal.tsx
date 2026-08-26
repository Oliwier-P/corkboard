import Modal from "../../Modal/Modal.tsx";
import { Button } from "../../Button/Button.tsx";
import { LabeledInput } from "../../LabeledInput/LabeledInput.tsx";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../../../api/api.ts";
import { useWorkspaceStore } from "../../../../store/workspaceStore.ts";

interface CreateTagModalProps {
    onSave: (data: any) => void;
    onClose: () => void;
}

type Inputs = {
    name: string;
    color: string;
};

const CreateTagModal = ({ onSave, onClose }: CreateTagModalProps) => {
    const { register, handleSubmit } = useForm<Inputs>();
    const workspaceId = useWorkspaceStore((state) => state.workspace?.id);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        api.post("/tags", { name: data.name, color: data.color, workspace_id: workspaceId }).then((response) => {
            onSave(response.data);
            onClose();
        });
    };

    return (
        <Modal onClose={onClose}>
            <Modal.Header title="Create new tag" />
            <Modal.Body>
                <LabeledInput
                    style={{ width: "100%" }}
                    label="Name"
                    register={register("name", {
                        required: "You have to enter a tag name!",
                    })}
                />
                <input
                    type="color"
                    {...register("color", {
                        required: "You have to select a color!",
                    })}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button color="primary" onClick={handleSubmit(onSubmit)}>
                    Create
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTagModal;
