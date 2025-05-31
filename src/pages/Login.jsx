import React from 'react';
import "../style/Dashboard.css"
import "../style/Login.css"

function LoginPage() {
    const handleSteamLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/login.php`;
    };

    return (
        <div className="dashboard-layout">
            <div className="dashboard-main">
                <img src="/full_2k.png" alt="EdgeGamers" className="login-logo" />
                <h1 className="login-title"><b>Login to Access Dashboard</b></h1>
                <button className="login-button" onClick={handleSteamLogin}>Login with Steam</button>
            </div>
        </div>
    );
}

export default LoginPage;