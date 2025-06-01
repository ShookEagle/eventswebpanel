import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import {AuthProvider} from "./context/AuthContext.jsx";
import {ConfirmModalProvider} from "./context/ConfirmModalContext.jsx";
import {ToastProvider} from "./context/ToastContext.jsx";
import {PromptModalProvider} from "./context/PromptModalContext.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <ToastProvider>
                <PromptModalProvider>
                    <ConfirmModalProvider>
                        <App />
                    </ConfirmModalProvider>
                </PromptModalProvider>
            </ToastProvider>
        </AuthProvider>
    </BrowserRouter>
)
