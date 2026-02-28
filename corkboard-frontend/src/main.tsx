import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/LoginPage/LoginPage.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="*" element={<div>NO ROUTE</div>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
)
