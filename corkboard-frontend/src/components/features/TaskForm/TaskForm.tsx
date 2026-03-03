import "./TaskForm.scss"
import {Input} from "../../ui/Input/Input.tsx";
import {Button} from "../../ui/Button/Button.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";

type EmptyTaskProps = {
    onSave: (name: string) => void
    ref: React.Ref<HTMLDivElement>
}

type Inputs = {
    name: string
}

export const TaskForm = ({onSave, ref}: EmptyTaskProps) => {
    const {register, handleSubmit} = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        onSave(data.name)
    }

    return (
        <div className="empty-task" ref={ref}>
            <form onSubmit={handleSubmit(onSubmit)} className="empty-task__header">
                <Input placeholder="Task Name..." variant="no-border" register={register('name', {
                    required: "Task name can't be empty!"
                })}/>
                <Button color="primary" size="small" type="submit">Save</Button>
            </form>
        </div>
    )
}