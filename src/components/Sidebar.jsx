import '../style/Sidebar.css';
import { Home, Users, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
    { name: 'Home', icon: <Home />, href: '/' },
    { name: 'Users', icon: <Users />, href: '/players' },
    { name: 'Settings', icon: <Settings />, href: '/' },
];

export default function Sidebar() {
    const { setUser } = useAuth();

    function handleLogout() {

        fetch(`${import.meta.env.VITE_API_URL}/logout.php`, {
            credentials: 'include',
        }).then(() => {
            setUser({loggedIn: false});
        })
    }

    return (
        <div className="sidebar">
            <img src="/ego_favicon.png" alt="Logo" className="logo" />
            <nav className="nav">
                {navItems.map((item) => (
                    <Link key={item.name} to={item.href} className="nav-item" title={item.name}>
                        {item.icon}
                    </Link>
                ))}
            </nav>
            <img src={"/shook_pfp.png"} alt="Logged-In as ShookEagle" className="user-icon" />
            <a href="/login" className="logout" title="Logout">
                <LogOut onClick={handleLogout}/>
            </a>
        </div>
    );
}
