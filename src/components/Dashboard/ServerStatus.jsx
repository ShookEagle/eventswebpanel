import React from 'react'
import "../../style/ServerStatus.css"

export default function ServerStatus() {
    return (
        <div className="dashboard-server-status-box">
            <div className="card-grid">
                <div className="card">Server Status: impl</div>
                <div className="card">Current Map: impl</div>
                <div className="card">Total Players: impl/64</div>
                <div className="card">Game Mode: impl</div>
            </div>
        </div>
    )
}