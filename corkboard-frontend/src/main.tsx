import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage/LoginPage.tsx";
import {CurrentReleasePage} from "./pages/./CurrentReleasePage/CurrentReleasePage.tsx";
import {ProtectedRoute} from "./components/features/ProtectedRoute.tsx";
import {AuthProvider} from "./context/auth/AuthProvider.tsx";
import {SignUpPage} from "./pages/SignUpPage/SignUpPage.tsx";
import {ReleasesPage} from "./pages/ReleasesPage/ReleasesPage.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/home" element={<ProtectedRoute><CurrentReleasePage/></ProtectedRoute>}/>
                    <Route path="/releases" element={<ProtectedRoute><ReleasesPage/></ProtectedRoute>}/>
                    <Route path="*" element={<div>NO ROUTE</div>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
)
