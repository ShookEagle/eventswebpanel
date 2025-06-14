import React, {useEffect, useState} from 'react';
import "../style/Dashboard.css";
import "../style/Players.css";
import PlayersListAll from "../components/Players/PlayersListAll.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function PlayersPage() {
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [players, setPlayers] = useState({});

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}api/players.php`)
            .then(res => res.json())
            .then(setPlayers);
    }, []);

    const togglePlayer = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    const kick = () => {
        if (selected.length === 0) {
            alert("Kicking ALL players");
        } else {
            alert(`Kicking ${selected.length} player(s)`);
        }
    };

    const mute = () => {
        if (selected.length === 0) {
            alert("Muting ALL players");
        } else {
            alert(`Muting ${selected.length} player(s)`);
        }
    };

    const gag = () => {
        if (selected.length === 0) {
            alert("Gagging ALL players");
        } else {
            alert(`Gagging ${selected.length} player(s)`);
        }
    };

    return (
        <>
            <Sidebar />
            <div style={{ marginLeft: '90px', backgroundColor: '#121217', minHeight: '100vh', color: 'white' }}>
                <div className="dashboard-layout">
                    <div className="dashboard-main">
                        <h1 className="dashboard-title"><b>Players List</b></h1>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '10px',
                            flexWrap: 'wrap'
                        }}>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search players..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            <div className="bulk-actions" style={{ display: 'flex', gap: '10px' }}>
                                <button className="action-button kick" onClick={kick}>
                                    {selected.length === 0 ? 'Kick All' : 'Kick Selected'}
                                </button>
                                <button className="action-button mute" onClick={mute}>
                                    {selected.length === 0 ? 'Mute All' : 'Mute Selected'}
                                </button>
                                <button className="action-button gag" onClick={gag}>
                                    {selected.length === 0 ? 'Gag All' : 'Gag Selected'}
                                </button>
                            </div>
                        </div>

                        <PlayersListAll
                            players={players.filter(Object.entries(players).filter(([slot, p]) =>
                                p.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                String(p.SteamId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                                p.Rank.toLowerCase().includes(searchTerm.toLowerCase())
                            ))}
                            selected={selected}
                            togglePlayer={togglePlayer}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
