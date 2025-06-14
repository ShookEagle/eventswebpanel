import '../style/Sidebar.css';
import { Home, Users, Settings, LogOut, MapPlus, Gamepad2, SlidersVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {useConfirmModal} from "../context/ConfirmModalContext.jsx";

const navItems = [
    { name: 'Home', icon: <Home />, href: '/' },
    { name: 'Users', icon: <Users />, href: '/players' },
    { name: 'Modes', icon: <Gamepad2 />, href: '/modes' },
    { name: 'Maps', icon: <MapPlus />, href: '/maps' },
    { name: 'Commands', icon: <SlidersVertical />, href: '/commands' },
    { name: 'Settings', icon: <Settings />, href: '/' },
];

export default function Sidebar() {
    const { setUser } = useAuth();
    const { confirm } = useConfirmModal();

    function handleLogout() {
        confirm({
            title: 'Logout',
            content: 'Are you sure you want to logout?',
            onConfirm: () => {
                fetch(`${import.meta.env.VITE_API_URL}logout.php`, {
                    credentials: 'include',
                }).then(() => {
                    setUser({loggedIn: false});
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000)
                })
            }
        })
    }

    return (
        <div className="sidebar">
            <img src="../../public/ego_favicon.png" alt="Logo" className="logo" />
            <nav className="nav">
                {navItems.map((item) => (
                    <Link key={item.name} to={item.href} className="nav-item" title={item.name}>
                        {item.icon}
                    </Link>
                ))}
            </nav>
            <img src={"../../public/shook_pfp.png"} alt="Logged-In as ShookEagle" className="user-icon" />
            <a className="logout" title="Logout">
                <LogOut onClick={handleLogout}/>
            </a>
        </div>
    );
}
