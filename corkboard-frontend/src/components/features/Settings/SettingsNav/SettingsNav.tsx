import './SettingsNav.scss';
import { NavLink } from 'react-router-dom';

export const SettingsNav = () => {
  return (
    <nav className="settings-nav">
      <h2 className="settings-nav__title">All Settings</h2>

      <div className="settings-nav__section">
        <h3 className="settings-nav__sub-title">Workspace</h3>
        <ul className="settings-nav__settings">
          <li className="settings-nav__settings-item">
            <NavLink to="/settings/workspace/users">People</NavLink>
          </li>
          <li className="settings-nav__settings-item">
            <NavLink to="/settings/workspace/general">Settings</NavLink>
          </li>
        </ul>
      </div>

      <div className="settings-nav__section">
        <h3 className="settings-nav__sub-title">Nickname</h3>
        <ul className="settings-nav__settings">
          <li className="settings-nav__settings-item">
            <NavLink to="/settings/user/profile">My settings</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
