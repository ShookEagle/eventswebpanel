import React from 'react'
import "../../style/LogBox.css"

export default function LogBox() {
    return (
        <div className="dashboard-log-panel">
            <h2 className="log-title">Logs (Impl)</h2>
            <div className="log-box">
                <ul>
                    <li>[Map] de_inferno ➜ de_nuke</li>
                    <li>[Mode] PropHunt 👀 Enabled</li>
                    <li>[Plugin] HideAndSeek disabled</li>
                    <li>[Admin] Started “1v1 Multi”</li>
                </ul>
            </div>
        </div>
    )
}