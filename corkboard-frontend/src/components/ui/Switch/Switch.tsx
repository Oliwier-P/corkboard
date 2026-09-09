import "./Switch.scss";
import classNames from "classnames";

interface SwitchProps {
    className?: string;
    id?: string;
    name?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange: (value: boolean) => void;
}

const Switch = ({ className, id, name, checked, defaultChecked, onChange }: SwitchProps) => {
    return (
        <label className={classNames("switch", className)}>
            <input type="checkbox" id={id} name={name} checked={checked} defaultChecked={defaultChecked} onChange={(e) => onChange(e.target.checked)} />
            <span className="slider"></span>
        </label>
    );
};

export default Switch;
