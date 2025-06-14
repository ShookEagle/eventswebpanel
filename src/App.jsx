import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/Dashboard.jsx';
import PlayersPage from './pages/Players.jsx';
//import LoginPage from './pages/Login.jsx';
import Sidebar from './components/Sidebar.jsx';
//import { useAuth } from './context/AuthContext';
import MapsPage from "./pages/Maps.jsx";
import ModesPage from "./pages/Modes.jsx";
import CommandsPage from "./pages/Commands.jsx";

function App() {
    /*const { user } = useAuth();

    if (user === null) {
        return <div style={{ color: 'white' }}>Loading...</div>; // still checking session
    }*/

    /*if (!user.loggedIn) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        );
    }*/

    // Logged in
    return (
        <>
            <Sidebar />
            <div style={{ marginLeft: '64px' }}>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/players" element={<PlayersPage />} />
                    <Route path="/login" element={<Navigate to="/" />} />
                    <Route path="/maps" element={<MapsPage />} />
                    <Route path="/modes" element={<ModesPage />} />
                    <Route path="/commands" element={<CommandsPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
