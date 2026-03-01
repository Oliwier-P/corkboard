import "./NavbarItem.scss"
import {Icon, type IconNames} from "../../ui/Icons/Icon.tsx";
import {useNavigate} from "react-router-dom";

type NavbarItemProps = {
    icon: IconNames,
    label: string,
    path: string,
}

export const NavbarItem = ({icon, label, path}: NavbarItemProps) => {
    const navigate = useNavigate();
    const handleNavigation = () => navigate(path)

    return (
        <div className="navbar-item" onClick={handleNavigation}>
            <Icon icon={icon} className="navbar-item__icon"/>
            <span className="navbar-item__label">{label}</span>
        </div>
    )
}