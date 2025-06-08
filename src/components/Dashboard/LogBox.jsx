import { useEffect, useState } from 'react';
import "../../style/LogBox.css";

export default function LogBox() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/logs.php')
            .then(res => res.json())
            .then(data => setLogs(data))
            .catch(err => console.error('Failed to load logs:', err));
    }, []);

    return (
        <div className="dashboard-log-panel">
            <h2 className="log-title">Logs</h2>
            <div className="log-box">
                <ul>
                    {logs.map((log, i) => (
                        <li key={i}>
                            <b>[{log.Type}]</b> {log.Message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}