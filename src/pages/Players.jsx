import React, { useState } from 'react';
import "../style/Dashboard.css";
import "../style/Players.css";
import PlayersListAll from "../components/Players/PlayersListAll.jsx";
import Sidebar from "../components/Sidebar.jsx";

const fakePlayers = [
    { id: 1, roleType: "role-ego", role: "=(eGO)=", name: 'ShookEagle', steamId: 'STEAM_1:0:12345', team: 'CT' },
    { id: 2, roleType: "role-manager", role: "Manager", name: 'TeleTubby', steamId: 'STEAM_1:1:98765', team: 'T' },
    { id: 3, roleType: "role-community-manager", role: "Community Manager", name: 'Blank_dvth', steamId: 'STEAM_1:1:11111', team: 'Spectator' },
    { id: 4, roleType: "role-eg", role: "=(eG)=", name: 'Maryvale', steamId: 'STEAM_1:1:13579', team: 'CT' },
    { id: 5, roleType: "role-e", role: "=(e)=", name: 'Nappin', steamId: 'STEAM_1:1:69420', team: 'T' },
    { id: 6, roleType: "role-senior-manager", role: "Senior Manager", name: 'Buster', steamId: 'STEAM_1:1:LOSER', team: 'Spectator' },
];

export default function PlayersPage() {
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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
                            players={fakePlayers.filter(p =>
                                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                p.steamId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                p.role.toLowerCase().includes(searchTerm.toLowerCase())
                            )}
                            selected={selected}
                            togglePlayer={togglePlayer}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
