import "./DocumentsNav.scss";
import SubNavbar from "../../../layout/SubNavbar/SubNavbar.tsx";
import { NavLink } from "react-router-dom";
import { Icon } from "../../../ui/Icons/Icon.tsx";
import { Button } from "../../../ui/Button/Button.tsx";

const DocumentsNav = () => {
    return (
        <SubNavbar className="documents-nav">
            <SubNavbar.Header header="Documents" />

            <SubNavbar.Body className="documents-nav__body">
                <NavLink className="documents-nav__page" to="/workspaces/1/document/1">
                    <Icon icon="document" />
                    Doc 1
                </NavLink>

                <Button className="documents-nav__create">+ Add Document</Button>
            </SubNavbar.Body>
        </SubNavbar>
    );
};

export default DocumentsNav;
