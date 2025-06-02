import React, { useEffect, useState } from 'react';
import "../style/Dashboard.css";
import "../style/Maps.css";
import Sidebar from "../components/Sidebar.jsx";
import { useConfirmModal } from '../context/ConfirmModalContext';
import { usePromptModal } from '../context/PromptModalContext.jsx';
import { useToast } from '../context/ToastContext';
import EditMapGroupModal from '../components/EditMapGroupModal.jsx';

export default function MapsPage() {
    const [mapGroups, setMapGroups] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [editTarget, setEditTarget] = useState(null);
    const { confirm } = useConfirmModal();
    const { prompt } = usePromptModal();
    const { showToast } = useToast();

    useEffect(() => {
        fetch('http://localhost:8000/api/mapgroups.php')
            .then(res => res.json())
            .then(setMapGroups);
    }, []);

    const addGroup = async () => {
        const name = await prompt({
            title: "Enter a new Map Group Name",
            defaultValue: ""
        });
        if (!name || mapGroups[name]) {
            showToast("Map Group already exists.", "error");
            return;
        }
        setMapGroups(prev => ({ ...prev, [name]: [] }));
        saveAll()
    };

    const deleteGroup = (group) => {
        confirm({
            title: 'Delete Map Group',
            content: 'Are you sure you want to delete this group?',
            onConfirm: () => {
                const updated = { ...mapGroups };
                delete updated[group];
                setMapGroups(updated);
                saveAll(updated)
                showToast("Map Group deleted.");
            }
        })
    };

    const saveAll = (groups = mapGroups) => {
        fetch('http://localhost:8000/api/mapgroups.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(groups)
        }).then(() => showToast("Map Groups successfully Saved", "success"));
    };


    const editGroup = (group) => {
        setEditTarget(group);
    };

    const renameGroup = async  (oldName) => {
        const newName = await prompt({
            title: "Rename Map Group",
            message: `Rename "${oldName}" to:`,
            defaultValue: oldName
        });

        if (!newName || newName === oldName) return;
        if (mapGroups[newName]) {
            showToast("A group with that name already exists.");
            return;
        }

        const updated = { ...mapGroups };
        updated[newName] = updated[oldName];
        delete updated[oldName];
        setMapGroups(updated);
        showToast("Map group renamed.");
        saveAll(updated)
    };

    return (
        <>
            <Sidebar />
            <div style={{ marginLeft: '90px', backgroundColor: '#121217', minHeight: '100vh', color: 'white' }}>
                <div className="dashboard-layout">
                    <div className="dashboard-main">
                        <h1 className="dashboard-title"><b>Map Groups</b></h1>
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
                                <button className="action-button kick" onClick={addGroup}>Add Group</button>
                                <button className="action-button mute" onClick={saveAll}>Save All</button>
                            </div>
                        </div>

                        <div className="list-box">
                            <table className="maps-table">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Map Count</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.entries(mapGroups)
                                    .sort(([a], [b]) => a.localeCompare(b))
                                    .map(([groupName, maps]) => (
                                    <tr key={groupName}>
                                        <td>{groupName}</td>
                                        <td>{maps.length}</td>
                                        <td>
                                            <button className="action-button rename" onClick={() => renameGroup(groupName)}>Rename</button>
                                            <button className="action-button edit" onClick={() => editGroup(groupName)}>Edit</button>
                                            <button className="action-button delete" onClick={() => deleteGroup(groupName)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <EditMapGroupModal
                    isOpen={!!editTarget}
                    groupName={editTarget}
                    maps={mapGroups[editTarget] || []}
                    onSave={(updatedMaps) => {
                        const cleaned = updatedMaps.filter(
                            map => map.name.trim() !== ''
                        ).map(map => ({
                            name: map.name.trim(),
                            workshopId: map.workshopId.replace(/\D/g, '') // remove non-digits
                        }));

                        const updated = { ...mapGroups };
                        updated[editTarget] = cleaned;
                        setMapGroups(updated);
                        setEditTarget(null);
                        showToast("Map group updated!");
                        saveAll(updated);
                    }}
                    onCancel={() => setEditTarget(null)}
                />
            </div>
        </>
    );
}
