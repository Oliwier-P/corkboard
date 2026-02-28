import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage/LoginPage.tsx";
import {HomePage} from "./pages/HomePage/HomePage.tsx";
import {ProtectedRoute} from "./components/features/ProtectedRoute.tsx";
import {AuthProvider} from "./context/auth/AuthProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
                    <Route path="*" element={<div>NO ROUTE</div>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
)
