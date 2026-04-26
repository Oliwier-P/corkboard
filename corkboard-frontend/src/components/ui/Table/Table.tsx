import "./Table.scss"
import classNames from "classnames";

type Column<T> = {
    key: keyof T;
    header: string;
    render?: (value: any, row: T) => React.ReactNode;
}

type TableProps<T> = {
    data: T[],
    columns: Column<T>[];
    children?: React.ReactNode
}

export function Table<T extends Record<string, any>>({data, columns, children}: TableProps<T>) {
    return (
        <div className="table">
            <table>
                <thead>
                {columns.map(col => (
                    <th key={String(col.key)} className={classNames(col.header.toLowerCase())}>
                        {col.header}
                    </th>
                ))}
                </thead>
                <tbody>
                <tr>
                    <td colSpan={3} style={{padding: 0}}>
                        {children}
                    </td>
                </tr>
                {data.map((row, i) => (
                    <tr key={i}>
                        {columns.map(col => (
                            <td key={String(col.key)} className={classNames(col.header.toLowerCase())}>
                                {col.render ? col.render(row[col.key], row) : row[col.key]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}