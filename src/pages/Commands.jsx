import Sidebar from "../components/Sidebar.jsx";
import React from "react";

export default function CommandsPage() {
    return (
        <>
            <Sidebar />
            <div style={{ marginLeft: '90px', backgroundColor: '#121217', minHeight: '100vh', color: 'white' }}>
                <div className="dashboard-layout">
                    <div className="dashboard-main">
                        <h1 className="dashboard-title"><b>Command Packs</b></h1>
                    </div>
                </div>
            </div>
        </>
    )
}