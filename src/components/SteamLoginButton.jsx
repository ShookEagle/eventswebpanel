import React from 'react';
import '../style/SteamLoginButton.css';

function SteamLoginButton() {
    const handleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/login.php`;
    };

    return (
        <button onClick={handleLogin}>
            <h2>Sign-in Through Steam</h2>
        </button>
    )
}

export default SteamLoginButton;