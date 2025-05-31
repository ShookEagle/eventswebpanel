import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // null = still loading

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/check-login.php`, {
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error('Unauthorized');
                return res.json();
            })
            .then(data => setUser({ ...data, loggedIn: true }))
            .catch(() => setUser({ loggedIn: false }));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
