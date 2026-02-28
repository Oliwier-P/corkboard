import "./Card.scss"
import classNames from "classnames";

type CardProps = {
    children?: React.ReactNode;
    header?: string;
    className?: string;
}
export const Card = ({children, header, className}: CardProps) => {
    return (
        <div className={classNames("card", className)}>
            <span className="card__title">{header}</span>
            {children}
        </div>
    )
}
