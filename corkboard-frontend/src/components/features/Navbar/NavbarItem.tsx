import "./NavbarItem.scss"
import {Icon, type IconNames} from "../../ui/Icons/Icon.tsx";

type NavbarItemProps = {
    icon: IconNames,
    label: string,
}

export const NavbarItem = ({icon, label}: NavbarItemProps) => {
    return (
        <div className="navbar-item">
            <Icon icon={icon} className="navbar-item__icon" />
            <span className="navbar-item__label">{label}</span>
        </div>
    )
}