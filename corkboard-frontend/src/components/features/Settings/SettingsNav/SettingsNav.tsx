import './SettingsNav.scss';
import {NavLink} from 'react-router-dom';
import {Icon} from "../../../ui/Icons/Icon.tsx";

export const SettingsNav = () => {
    return (
        <nav className="settings-nav">
            <div className="settings-nav__title">All Settings</div>

            <div className="settings-nav__section">
                <div className="settings-nav__sub-title">Workspace</div>
                <div className="settings-nav__settings">
                    <NavLink className="settings-nav__tab" to="/settings/workspace/general">
                        <Icon icon="gear"/>
                        General
                    </NavLink>
                    <NavLink className="settings-nav__tab" to="/settings/workspace/users">
                        <Icon icon="users"/>
                        Users
                    </NavLink>
                </div>
            </div>

            <div className="settings-nav__section">
                <div className="settings-nav__sub-title">My Settings</div>
                <div className="settings-nav__settings">
                    <NavLink className="settings-nav__tab" to="/settings/user/profile">
                        <Icon icon="userCircle"/>
                        Preferences
                    </NavLink>
                    <NavLink className="settings-nav__tab" to="/settings/user/workspaces">
                        <Icon icon="workspaces"/>
                        Workspaces
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};
