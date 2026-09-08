import "./Row.scss"
import { ClassNames } from "@/global/utils.ts";

type RowProps = {
    children: React.ReactNode;
    className?: string;
}

export const Row = ({children, className}: RowProps) => {
    return (
        <div className={ClassNames("row", className)}>
            {children}
        </div>
    )
}