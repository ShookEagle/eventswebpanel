import React, { useEffect, useState } from 'react';
import '../style/Modal.css';
import '../style/Commands.css';

export default function EditCommandPackModal({ isOpen, packName, packData, onSave, onCancel }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [viewing, setViewing] = useState('on'); // 'on' or 'off'
    const [onCommands, setOnCommands] = useState('');
    const [offCommands, setOffCommands] = useState('');

    useEffect(() => {
        if (isOpen && packData) {
            setName(packName);
            setDescription(packData.description || '');
            setOnCommands((packData.onExecCmds || []).join('\n'));
            setOffCommands((packData.offExecCmds || []).join('\n'));
            setViewing('on');
        }
    }, [isOpen, packData, packName]);

    useEffect(() => {
        document.body.classList.toggle('modal-open', isOpen);
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        const updated = {
            description: description.trim(),
            onExecCmds: onCommands.split(/[\n;]/).map(cmd => cmd.trim()).filter(Boolean),
            offExecCmds: offCommands.split(/[\n;]/).map(cmd => cmd.trim()).filter(Boolean)
        };
        onSave(name, updated);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-box tall-modal" style={{ maxWidth: '700px', minWidth: '500px'}}>
                <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <h2 style={{ margin: 0 }}>
                        <b>Edit Command Pack:</b> {packName}
                    </h2>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="modal-button save" onClick={handleSave}>Save</button>
                        <button className="modal-button cancel" onClick={onCancel}>Cancel</button>
                    </div>
                </div>

                <div className="modal-content" style={{ paddingBottom: 0 }}>
                    <label><b>Description:</b></label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="modal-input"
                        placeholder="Enter description..."
                        style={{ marginBottom: '16px' }}
                    />

                    <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                        <button
                            className={`modal-tab ${viewing === 'on' ? 'active' : ''}`}
                            onClick={() => setViewing('on')}
                        >
                            ON Commands
                        </button>
                        <button
                            className={`modal-tab ${viewing === 'off' ? 'active' : ''}`}
                            onClick={() => setViewing('off')}
                        >
                            OFF Commands
                        </button>
                    </div>

                    <textarea
                        value={viewing === 'on' ? onCommands : offCommands}
                        onChange={(e) =>
                            viewing === 'on'
                                ? setOnCommands(e.target.value)
                                : setOffCommands(e.target.value)
                        }
                        className="modal-textarea"
                        placeholder="Enter one command per line or separate by semicolon..."
                        style={{ minHeight: '250px', resize: 'vertical' }}
                    />
                </div>
            </div>
        </div>
    );
}
