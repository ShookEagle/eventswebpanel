import Sidebar from "../components/Sidebar.jsx";
import React, {useEffect, useState} from "react";
import {useConfirmModal} from "../context/ConfirmModalContext.jsx";
import {usePromptModal} from "../context/PromptModalContext.jsx";
import {useToast} from "../context/ToastContext.jsx";
import "../style/Modes.css"
import EditModeModal from "../components/Modals/EditModeModal.jsx";
import getEmptyModeTemplate from '../const/EmptyModeTemplate.js';

export default function ModesPage() {
    const [Modes, setModes] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [editTarget, setEditTarget] = useState(null);
    const { confirm } = useConfirmModal();
    const { prompt } = usePromptModal();
    const { showToast } = useToast();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}api/modes.php`)
            .then(res => res.json())
            .then(setModes);
    }, []);

    const addMode = async () => {
        const name = await prompt({
            title: 'Enter a new Mode Name',
            defaultValue: ''
        });

        if (!name || Modes[name]) {
            showToast('Mode already exists or name is invalid.', 'error');
            return;
        }

        const newMode = getEmptyModeTemplate();
        setModes(prev => ({ ...prev, [name]: newMode }));
    };

    const deleteMode = (mode) => {
        confirm({
            title: 'Delete Mode',
            content: 'Are you sure you want to delete this mode?',
            onConfirm: () => {
                const updated = { ...Modes };
                delete updated[mode];
                setModes(updated);
                showToast("Mode deleted.");
                saveModes(updated);
            }
        })
    };

    const saveAll = () => {
        const finalData = {};
        for (const [name, mode] of Object.entries(Modes)) {
            finalData[name] = cleanModeForSave(mode);
        }
        fetch(`${import.meta.env.VITE_API_URL}api/modes.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData)
        }).then(() => showToast("Modes successfully saved", "success"))
            .catch(() => showToast("Failed to save Modes", "error"));
    };

    const saveModes = (newModes = Modes) => {
        const finalData = {};
        for (const [name, mode] of Object.entries(newModes)) {
            finalData[name] = cleanModeForSave(mode);
        }
        fetch(`${import.meta.env.VITE_API_URL}api/modes.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData)
        }).then(() => showToast("Modes successfully saved", "success"))
            .catch(() => showToast("Failed to save Modes", "error"));
    };

    const cleanModeForSave = (mode) => {
        const cleaned = structuredClone(mode);

        if (!cleaned.settings || typeof cleaned.settings !== 'object') {
            cleaned.settings = {};
            return cleaned;
        }

        for (const [section, fields] of Object.entries(cleaned.settings)) {
            if (Array.isArray(fields)) continue; // skip array sections like customCommands

            for (const key in fields) {
                let val = fields[key];
                if (typeof val !== 'string') continue;

                const trimmed = val.trim();

                if (trimmed === '') {
                    val = null;
                } else if (trimmed === '""') {
                    val = '';
                } else if (!isNaN(trimmed)) {
                    const num = Number(trimmed);
                    val = Number.isInteger(num) ? parseInt(trimmed, 10) : parseFloat(trimmed);
                }

                cleaned.settings[section][key] = val;
            }
        }

        return cleaned;
    };

    const editMode = (modeName) => {
        setEditTarget(modeName);
    };

    const renameMode = async (oldName) => {
        const newName = await prompt({
            title: "Rename Mode",
            message: `Rename "${oldName}" to:`,
            defaultValue: oldName
        });

        if (!newName || newName === oldName) return;
        if (Modes[newName]) {
            showToast("A mode with that name already exists.");
            return;
        }

        const updated = { ...Modes };
        updated[newName] = updated[oldName];
        delete updated[oldName];
        setModes(updated);
        showToast("Mode renamed.");
        saveModes(updated);
    };

    return (
        <>
            <Sidebar />
            <div style={{ marginLeft: '90px', backgroundColor: '#121217', minHeight: '100vh', color: 'white' }}>
                <div className="dashboard-layout">
                    <div className="dashboard-main">
                        <h1 className="dashboard-title"><b>Modes</b></h1>
                        <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search map groups..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="bulk-actions">
                                <button className="action-button kick" onClick={addMode}>Add Mode</button>
                                <button className="action-button mute" onClick={saveAll}>Save All</button>
                            </div>
                        </div>

                        <div className="list-box">
                            <table className="modes-table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Map Groups</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.entries(Modes)
                                    .filter(([modeName]) =>
                                        modeName.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .sort(([a], [b]) => a.localeCompare(b))
                                    .map(([modeName, mode]) => (
                                        <tr key={modeName}>
                                            <td>{modeName}</td>
                                            <td>{mode.description}</td>
                                            <td>{mode.mapGroup}</td>
                                            <td>
                                                <button className="action-button rename" onClick={() => renameMode(modeName)}>Rename</button>
                                                <button className="action-button edit" onClick={() => editMode(modeName)}>Edit</button>
                                                <button className="action-button delete" onClick={() => deleteMode(modeName)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <EditModeModal
                    isOpen={!!editTarget}
                    modeName={editTarget}
                    modeData={Modes[editTarget]}
                    onSave={(updatedMode) => {
                        const updated = { ...Modes, [editTarget]: updatedMode };
                        setModes(updated);
                        setEditTarget(null);
                        showToast("Mode updated.");
                        saveModes(updated);
                    }}
                    onCancel={() => setEditTarget(null)}
                    availablePlugins={[
                        "css_kick", "css_ban", "css_god", "css_rcon", "css_respawn", "css_freeze", "css_noclip"
                    ]}
                />
            </div>
        </>
    )
}