import React from 'react';
import '../style/SteamLoginButton.css';

function SteamLoginButton() {
    const handleLogin = () => {
        window.location.href = "http://localhost:8000/php/login.php"; // change to your backend Steam login route
    };

    return (
        <button onClick={handleLogin}>
            <h2>Sign-in Through Steam</h2>
        </button>
    )
}

export default SteamLoginButton;