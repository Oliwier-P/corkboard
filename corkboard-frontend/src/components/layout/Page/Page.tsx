import "./Page.scss"
import {ClassNames} from "../../../global/utils.ts";
import {Row} from "../Row/Row.tsx";

type PageProps = {
    title: string
    children?: React.ReactNode
    className?: string
    buttons?: React.ReactNode
}

export const Page = ({title, children, buttons, className}: PageProps) => {
    return (
        <div className={ClassNames("page", className)}>
            <div className="page__title">
                {title}
                <Row className="page__buttons">
                    {buttons}
                </Row>
            </div>
            <div className="page__content">
                {children}
            </div>
        </div>
    )
}