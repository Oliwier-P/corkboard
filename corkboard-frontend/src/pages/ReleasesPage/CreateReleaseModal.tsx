import Modal from "../../components/ui/Modal/Modal"
import {Button} from "../../components/ui/Button/Button.tsx";
import {LabeledInput} from "../../components/ui/LabeledInput/LabeledInput.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";

type CreateReleaseModalProps = {
    onSave: (name: string) => void
    onClose: () => void
}

type Inputs = {
    name: string
}

export const CreateReleaseModal = ({onSave, onClose}: CreateReleaseModalProps) => {
    const {register, handleSubmit} = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        onSave(data.name)
    }

    return (
        <Modal onClose={onClose}>
            <Modal.Header title="Create new Release"/>
            <Modal.Body>
                <LabeledInput style={{width: "100%"}} label="Name" register={register('name', {
                    required: "You have to enter a release name!"
                })}/>
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
    )
}