import React, { useState, useEffect } from 'react';
import '../style/Modal.css';

export default function EditMapGroupModal({ isOpen, groupName, maps, onSave, onCancel }) {
    const [localMaps, setLocalMaps] = useState([]);

    useEffect(() => {
        setLocalMaps(maps || []);
    }, [maps, isOpen]);

    const updateMap = (index, field, value) => {
        const updated = [...localMaps];
        updated[index][field] = value;
        setLocalMaps(updated);
    };

    const addMap = () => {
        setLocalMaps(prev => [...prev, { name: '', workshopId: '' }]);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-box" style={{ maxWidth: '800px', minWidth: '500px'}}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 ><b>Edit Group:</b> {groupName}</h2>
                    <div>
                        <button className="modal-button save" onClick={() => onSave(localMaps)}>Save</button>
                        <button className="modal-button cancel" onClick={onCancel}>Cancel</button>
                    </div>
                </div>

                <table className="maps-table" style={{ marginTop: '20px', width: '100%' }}>
                    <thead>
                    <tr>
                        <th>Map Name</th>
                        <th>Workshop ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {localMaps.map((map, idx) => (
                        <tr key={idx}>
                            <td>
                                <input
                                    type="text"
                                    value={map.name}
                                    placeholder="Map name"
                                    onChange={e => updateMap(idx, 'name', e.target.value)}
                                    className="modal-input"
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={map.workshopId}
                                    placeholder="Workshop ID"
                                    onChange={e => updateMap(idx, 'workshopId', e.target.value)}
                                    className="modal-input"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <button className="modal-button kick" onClick={addMap}>Add New Map</button>
                </div>
            </div>
        </div>
    );
}
