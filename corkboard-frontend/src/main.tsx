import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.scss';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {LoginPage} from './pages/LoginPage/LoginPage.tsx';
import {CurrentReleasePage} from './pages/./CurrentReleasePage/CurrentReleasePage.tsx';
import {ProtectedRoute} from './components/features/ProtectedRoute.tsx';
import {AuthProvider} from './context/auth/AuthProvider.tsx';
import {SignUpPage} from './pages/SignUpPage/SignUpPage.tsx';
import {ReleasesPage} from './pages/ReleasesPage/ReleasesPage.tsx';
import {SettingsPage} from './pages/SettingsPage/SettingsPage.tsx';
import {WorkspaceGeneral} from './components/features/Settings/WorkspaceGeneral/WorkspaceGeneral.tsx';
import {WorkspaceUsers} from './components/features/Settings/WorkspaceUsers/WorkspaceUsers.tsx';
import {UserProfile} from './components/features/Settings/UserProfile/UserProfile.tsx';
import {WorkspaceList} from './components/features/Settings/WorkspaceList/WorkspaceList.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route
                        path="/workspaces/:workspaceId/current_release"
                        element={
                            <ProtectedRoute>
                                <CurrentReleasePage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/workspaces/:workspaceId/releases"
                        element={
                            <ProtectedRoute>
                                <ReleasesPage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <SettingsPage/>
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Navigate to="user/profile"/>}/>

                        <Route path="workspace/:workspaceId/general" element={<WorkspaceGeneral/>}/>
                        <Route path="workspace/:workspaceId/users" element={<WorkspaceUsers/>}/>
                        <Route path="user/profile" element={<UserProfile/>}/>
                        <Route path="user/workspaces" element={<WorkspaceList/>}/>
                    </Route>

                    <Route
                        path="/backlog"
                        element={
                            <ProtectedRoute>
                                <ReleasesPage/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<div>NO ROUTE</div>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,
);
