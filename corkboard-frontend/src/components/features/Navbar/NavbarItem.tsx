import "./NavbarItem.scss"
import {Icon, type IconNames} from "../../ui/Icons/Icon.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {ClassNames} from "../../../global/utils.ts";

type NavbarItemProps = {
    icon: IconNames,
    label: string,
    path: string,
}

export const NavbarItem = ({icon, label, path}: NavbarItemProps) => {
    const navigate = useNavigate();
    const location = useLocation()
    const handleNavigation = () => navigate(path)

    return (
        <div className={ClassNames("navbar-item", {active: location.pathname === path})} onClick={handleNavigation}>
            <Icon icon={icon} className="navbar-item__icon"/>
            <span className="navbar-item__label">{label}</span>
        </div>
    )
}