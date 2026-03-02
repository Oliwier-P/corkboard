import "./Navbar.scss"
import {NavbarItem} from "./NavbarItem.tsx";
import {Icon} from "../../ui/Icons/Icon.tsx";
import {useAuth} from "../../../context/auth/useAuth.ts";
import {Workspace} from "../Workspace/Workspace.tsx";
import {WorkspaceMenu} from "../Workspace/WorkspaceMenu.tsx";
import {useEffect, useRef, useState} from "react";

export const Navbar = () => {
    const {user} = useAuth()
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className="navbar">
            <div className="navbar__app-info">
                <Icon icon="AppLogo" className="navbar__logo" />
                <div className="navbar__app-name">Corkboard</div>
            </div>

            <Workspace onClick={toggleMenu}/>
            {isMenuOpen && <div ref={menuRef}><WorkspaceMenu /></div>}

            <NavbarItem icon="Box" label="Current Release" path="/home" />
            <NavbarItem icon="Rows" label="Backlog" path="/backlog" />
            <NavbarItem icon="Bookmarks" label="Releases" path="/releases" />

            {user && (
                <div className="navbar__user">
                    <span>{user.username}</span>
                </div>
            )}
        </div>
    )
}