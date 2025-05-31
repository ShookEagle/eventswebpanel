import React from 'react'
import Sidebar from '../components/Sidebar';
import LogBox from "../components/Dashboard/LogBox.jsx";
import ServerStatus from "../components/Dashboard/ServerStatus.jsx";
import '../style/Dashboard.css';

export default function Dashboard() {
    return (
        <>
            <Sidebar />
            <div style={{ marginLeft: '90px', backgroundColor: '#121217', minHeight: '100vh', color: 'white' }}>
                <div className="dashboard-layout">
                    <div className="dashboard-main">
                        <h1 className="dashboard-title"><b>Events Server Dashboard</b></h1>
                        <ServerStatus />
                    </div>
                    <LogBox />
                </div>
            </div>
        </>
    );
}