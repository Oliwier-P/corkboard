import "./CreateTagModal.scss";
import Modal from "@/ui/Modal/Modal.tsx";
import { Button } from "@/ui/Button/Button.tsx";
import { LabeledInput } from "@/ui/LabeledInput/LabeledInput.tsx";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "@/api";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import type { TagType } from "@/types/TagType.ts";

interface CreateTagModalProps {
    tag?: TagType;
    onSave: (data: any) => void;
    onClose: () => void;
}

type Inputs = {
    name: string;
    color: string;
};

const CreateTagModal = ({ tag, onSave, onClose }: CreateTagModalProps) => {
    const { register, handleSubmit } = useForm<Inputs>();
    const workspaceId = useWorkspaceStore((state) => state.workspace?.id);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (tag?.id) {
            api.put(`/tags/${tag.id}`, { name: data.name, color: data.color }).then((response) => {
                onSave(response.data);
            });
        } else {
            api.post("/tags", { name: data.name, color: data.color, workspace_id: workspaceId }).then((response) => {
                onSave(response.data);
            });
        }
    };

    return (
        <Modal className="tag-modal" onClose={onClose}>
            <Modal.Header title="Create new tag" />
            <Modal.Body>
                <LabeledInput
                    style={{ width: "100%" }}
                    label="Name"
                    defaultValue={tag?.name || ""}
                    register={register("name", {
                        required: "You have to enter a tag name!",
                    })}
                />
                <input
                    type="color"
                    defaultValue={tag?.color || "#ffffff"}
                    {...register("color", {
                        required: "You have to select a color!",
                    })}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button color="primary" onClick={handleSubmit(onSubmit)}>
                    {tag?.id ? "Save" : "Create"}
                </Button>
                <Button color="secondary" onClick={onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTagModal;
