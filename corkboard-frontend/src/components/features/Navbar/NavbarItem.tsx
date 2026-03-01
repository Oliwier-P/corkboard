import "./NavbarItem.scss"
import {Icon, type IconNames} from "../../ui/Icons/Icon.tsx";
import {useNavigate} from "react-router-dom";

type NavbarItemProps = {
    icon: IconNames,
    label: string,
}

export const NavbarItem = ({icon, label}: NavbarItemProps) => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        switch (label){
            case "Current Release":
                navigate("/home")
                break;
            case "Releases":
                navigate("/releases")
                break;
            default:
                break;
        }
    }

    return (
        <div className="navbar-item" onClick={handleNavigation}>
            <Icon icon={icon} className="navbar-item__icon" />
            <span className="navbar-item__label">{label}</span>
        </div>
    )
}