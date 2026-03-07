import {Icon} from "../Icons/Icon.tsx";
import {Button} from "../Button/Button.tsx";

export const UserSelect = () => {
    return (
        <Button color="outlined">
            <Icon icon="userCircle" className="task__user"/>
        </Button>
    )
}