import Sidebar from "../components/Sidebar.jsx";
import React, { useState, useEffect } from "react";
import "../style/Commands.css"
import { useToast } from '../context/ToastContext';
import { useConfirmModal } from '../context/ConfirmModalContext';
import { usePromptModal } from '../context/PromptModalContext.jsx';
import EditCommandPackModal from "../components/Modals/EditCommandPackModal.jsx";

export default function CommandsPage() {
    const [commandPacks, setCommandPacks] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [editTarget, setEditTarget] = useState(null);
    const { showToast } = useToast();
    const { confirm } = useConfirmModal();
    const { prompt } = usePromptModal();

    useEffect(() => {
        fetch('http://localhost:8000/api/commandpacks.php', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setCommandPacks(data))
            .catch(err => console.error('Failed to load command packs:', err));
    }, []);

    const addPack = async () => {
        const name = await prompt({
            title: "Enter a new Command Pack Name",
            defaultValue: ""
        });

        if (!name || commandPacks[name]) {
            showToast("Command Pack already exists.", "error");
            return;
        }

        const updated = {
            ...commandPacks,
            [name]: {
                description: "",
                onExecCmds: [],
                offExecCmds: []
            }
        };

        setCommandPacks(updated);
        showToast("Command Pack added.");
        saveChanges(updated);
    };

    const saveAll = () => {
        fetch('http://localhost:8000/api/commandpacks.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(commandPacks)
        })
            .then(() => showToast("Saved Command Packs", "success"))
            .catch(() => showToast("Failed to save command packs", "error"));
    }

    const saveChanges = (updated = commandPacks) => {
        fetch('http://localhost:8000/api/commandpacks.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(updated)
        })
            .then(() => showToast("Saved Command Packs", "success"))
            .catch(() => showToast("Failed to save command packs", "error"));
    }

    const renameGroup = async (oldName) => {
        const newName = await prompt({
            title: "Rename Command Pack",
            message: `Rename "${oldName}" to:`,
            defaultValue: oldName
        });

        if (!newName || newName === oldName) return;
        if (commandPacks[newName]) {
            showToast("A pack with that name already exists.");
            return;
        }

        const updated = { ...commandPacks };
        updated[newName] = updated[oldName];
        delete updated[oldName];

        setCommandPacks(updated);
        showToast("Command Pack renamed.");
        saveChanges(updated);
    }

    const editGroup = (pack) => {
        setEditTarget(pack)
    }

    const deleteGroup = (name) => {
        confirm({
            title: 'Delete Command Pack',
            content: `Are you sure you want to delete "${name}"?`,
            onConfirm: () => {
                const updated = { ...commandPacks };
                delete updated[name];
                setCommandPacks(updated);
                showToast("Command Pack deleted.");
                saveChanges(updated);
            }
        });
    }

    return (
        <>
            <Sidebar />
            <div style={{ marginLeft: '90px', backgroundColor: '#121217', minHeight: '100vh', color: 'white' }}>
                <div className="dashboard-layout">
                    <div className="dashboard-main">
                        <h1 className="dashboard-title"><b>Command Packs</b></h1>
                        <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="Search command packs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="bulk-actions">
                                <button className="action-button kick" onClick={addPack}>Add Command Pack</button>
                                <button className="action-button mute" onClick={saveAll}>Save All</button>
                            </div>
                        </div>

                        <div className="list-box">
                            <table className="commands-table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.entries(commandPacks)
                                        .filter(([name, pack]) =>
                                            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            pack.description?.toLowerCase().includes(searchTerm.toLowerCase())
                                        )
                                    .sort(([a], [b]) => a.localeCompare(b))
                                    .map(([name, pack]) => (
                                        <tr key={name}>
                                            <td>{name}</td>
                                            <td>{pack.description}</td>
                                            <td>
                                                <button className="action-button rename" onClick={() => renameGroup(name)}>Rename</button>
                                                <button className="action-button edit" onClick={() => editGroup(name)}>Edit</button>
                                                <button className="action-button delete" onClick={() => deleteGroup(name)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <EditCommandPackModal
                    isOpen={!!editTarget}
                    packName={editTarget}
                    packData={commandPacks[editTarget]}
                    onSave={(name, updatedPack) => {
                        const updated = { ...commandPacks };
                        updated[name] = updatedPack;
                        setCommandPacks(updated);
                        setEditTarget(null);
                        showToast("Command pack updated!");
                        saveChanges(updated);
                    }}
                    onCancel={() => setEditTarget(null)}
                />
            </div>
        </>
    )
}