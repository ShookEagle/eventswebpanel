import React from 'react'
import "../../style/Players.css"

export default function PlayersListAll({ players, selected, togglePlayer }) {
    return (
        <div className="list-box">
            <table className="players-table">
                <thead>
                <tr>
                    <th></th> {/* checkbox column */}
                    <th>Role</th>
                    <th>Name</th>
                    <th>SteamID</th>
                    <th>Team</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {players.map(player => (
                    <tr key={player.id} className={selected.includes(player.id) ? 'selected-row' : ''}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selected.includes(player.id)}
                                onChange={() => togglePlayer(player.id)}
                            />
                        </td>
                        <td>
                            <span className={`role-badge ${player.roleType}`}>
                                {player.role}
                            </span>
                        </td>
                        <td>{player.name}</td>
                        <td>{player.steamId}</td>
                        <td>{player.team}</td>
                        <td>
                            <button className="action-button kick">Kick</button>
                            <button className="action-button mute">Mute</button>
                            <button className="action-button ban">Ban</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
