import "./Page.scss"
import {ClassNames} from "../../../global/utils.ts";
import {Row} from "../Row/Row.tsx";

type PageProps = {
    title: string
    subTitle?: string
    children?: React.ReactNode
    className?: string
    buttons?: React.ReactNode
}

export const Page = ({title, subTitle, children, buttons, className}: PageProps) => {
    return (
        <div className={ClassNames("page", className)}>
            <div className="page__header">
                <span className="page__title">
                    {title}{subTitle ? ":" : ""} <span className="page__sub-title">{subTitle}</span>
                </span>
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