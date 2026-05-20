import "./BacklogColumn.scss"
import {Icon, type IconNames} from "../../../components/ui/Icons/Icon.tsx";

type BacklogColumnProps = {
    title: string
    icon: IconNames
    children?: React.ReactNode
}

export const BacklogColumn = ({title, icon, children}: BacklogColumnProps) => {
    return (
        <div className="backlog-column">
            <div className="backlog-column__header">
                <div className="backlog-column__title">
                    <Icon icon={icon}/> {title}
                </div>
            </div>
            <div className="backlog-column__tasks">
                {children}
            </div>
        </div>
    )
}