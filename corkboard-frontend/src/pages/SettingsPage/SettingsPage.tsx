import './SettingsPage.scss';
import { Navbar } from '../../components/features/Navbar/Navbar.tsx';
import { SettingsNav } from '../../components/features/Settings/SettingsNav/SettingsNav.tsx';
import { Outlet } from 'react-router-dom';

export const SettingsPage = () => {
  return (
    <div className="settings">
      <Navbar />
      <SettingsNav />

      <div className="settings-content">
        <Outlet />
      </div>
    </div>
  );
};
