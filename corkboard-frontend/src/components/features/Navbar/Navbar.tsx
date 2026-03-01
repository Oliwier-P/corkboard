import "./Navbar.scss"
import {NavbarItem} from "./NavbarItem.tsx";
import {Icon} from "../../ui/Icons/Icon.tsx";

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__app-info">
                <Icon icon="AppLogo" className="navbar__logo" />
                <div className="navbar__app-name">Corkboard</div>
            </div>
            <NavbarItem icon="Box" label="Current Release" />
            <NavbarItem icon="Rows" label="Backlog" />
            <NavbarItem icon="Bookmarks" label="Releases" />
        </div>
    )
}