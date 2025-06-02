import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { GripVertical, Trash2 } from 'lucide-react';
import '../style/Modal.css';

export default function EditMapGroupModal({ isOpen, groupName, maps, onSave, onCancel }) {
    const [localMaps, setLocalMaps] = useState([]);

    useEffect(() => {
        setLocalMaps(maps || []);
    }, [maps, isOpen]);

    useEffect(() => {
        document.body.classList.toggle('modal-open', isOpen);
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    const updateMap = (index, field, value) => {
        const updated = [...localMaps];
        updated[index][field] = value;
        setLocalMaps(updated);
    };

    const removeMap = (index) => {
        setLocalMaps(prev => prev.filter((_, i) => i !== index));
    };

    const addMap = () => {
        setLocalMaps(prev => [...prev, { name: '', workshopId: '' }]);
    };


    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-box tall-modal" style={{ maxWidth: '800px', minWidth: '500px' }}>
                <div className="modal-header">
                    <h2><b>Edit Group:</b> {groupName}</h2>
                    <div>
                        <button className="modal-button save" onClick={() => onSave(localMaps)}>Save</button>
                        <button className="modal-button cancel" onClick={onCancel}>Cancel</button>
                    </div>
                </div>

                <div className="modal-content scrollable-maps">
                    <table className="maps-table modal" style={{ width: '100%' }}>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Map Name</th>
                            <th>Workshop ID</th>
                            <th></th>
                        </tr>
                        </thead>
                        <ReactSortable
                            list={localMaps || []}
                            setList={setLocalMaps}
                            tag="tbody"
                            animation={150}
                            group="maps"
                        >
                            {localMaps.map((map, idx) => (
                                <tr key={idx} className="grip-handle">
                                    <td style={{ width: '32px', textAlign: 'center', cursor: 'grab' }}>
                                        <GripVertical size={18} />
                                    </td>
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
                                    <td style={{ width: '32px', textAlign: 'center' }}>
                                        <button onClick={() => removeMap(idx)} className="delete-icon">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </ReactSortable>
                    </table>
                </div>

                <div className="modal-footer">
                    <button className="modal-button kick" onClick={addMap}>Add New Map</button>
                </div>
            </div>
        </div>
    );
}
