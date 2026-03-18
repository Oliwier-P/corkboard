import Modal from "../../../ui/Modal/Modal.tsx";
import {LabeledInput} from "../../../ui/LabeledInput/LabeledInput.tsx";
import {Button} from "../../../ui/Button/Button.tsx";
import * as yup from "yup"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ErrorsDisplay} from "../../../ui/ErrorsDisplay/ErrorsDisplay.tsx";

type InviteUserModalProps = {
    onClose: () => void;
}

const schema = yup.object({
    username: yup.string().required("You have to enter a username!")
}).required()

type FormData = yup.InferType<typeof schema>

export const InviteUserModal = ({onClose}: InviteUserModalProps) => {

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)})

    const onSubmit = (data: FormData) => {
        console.log(data)
        console.log(data.username)
    }

    return (
        <Modal onClose={onClose}>
            <Modal.Header title="Invite User"/>
            <Modal.Body>
                <form>
                    <LabeledInput label="Username" register={register("username")}/>
                    <ErrorsDisplay errors={errors}/>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit(onSubmit)}>Invite</Button>
                <Button color="secondary" onClick={() => onClose()}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}