import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import Select from 'react-select';
import '../../style/Modal.css';
import '../../style/Commands.css';
import settingDescriptions from '../../const/descriptions.js';

export default function EditModeModal({ isOpen, modeName, modeData, onSave, onCancel, availablePlugins = [] }) {
    const [description, setDescription] = useState('');
    const [mapGroup, setMapGroup] = useState('');
    const [tags, setTags] = useState('');
    const [plugins, setPlugins] = useState([]);
    const [commandPacks, setCommandPacks] = useState([]);
    const [settings, setSettings] = useState({});
    const [mapGroupOptions, setMapGroupOptions] = useState([]);
    const [availableCommandPacks, setAvailableCommandPacks] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetch('http://localhost:8000/api/mapgroups.php')
                .then(res => res.json())
                .then(data => {
                    const groups = Object.keys(data);
                    setMapGroupOptions(groups);
                    if (!mapGroup && groups.includes("Active")) {
                        setMapGroup("Active");
                    }
                });

            fetch('http://localhost:8000/api/commandpacks.php', { credentials: 'include' })
                .then(res => res.json())
                .then(data => {
                    setAvailableCommandPacks(Object.keys(data).sort());
                })
                .catch(err => console.error('Failed to load command packs:', err));

            if (modeData) {
                setDescription(modeData.description || '');
                setMapGroup(modeData.mapGroup || '');
                setTags(modeData.tags || '');
                setPlugins(modeData.plugins || []);
                setCommandPacks(modeData.commandPacks || []);
                setSettings(modeData.settings || {});
            }
        }
    }, [isOpen, modeData]);

    useEffect(() => {
        document.body.classList.toggle('modal-open', isOpen);
        return () => document.body.classList.remove('modal-open');
    }, [isOpen]);

    if (!isOpen) return null;

    const updateSettingField = (section, key, newValue) => {
        const updated = { ...settings };

        if (key === null) {
            // section is actually 'customCommands' (array)
            updated[section] = newValue;
        } else {
            updated[section][key] = newValue;
        }

        setSettings(updated);
    };

    const handleSave = () => {
        const updated = {
            description: description.trim(),
            mapGroup: mapGroup.trim(),
            tags: tags.trim(),
            plugins,
            commandPacks,
            settings
        };
        onSave(updated);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-box tall-modal" style={{ maxWidth: '800px', minWidth: '500px' }}>
                <div className="modal-header">
                    <h2 style={{ margin: 0 }}><b>Edit Mode:</b> {modeName}</h2>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="modal-button save" onClick={handleSave}>Save</button>
                        <button className="modal-button cancel" onClick={onCancel}>Cancel</button>
                    </div>
                </div>

                <div className="modal-content">
                    <label title="This defines which map group (rotation) the mode uses."><b>Map Group:</b></label>
                    <select className="modal-input" value={mapGroup} onChange={e => setMapGroup(e.target.value)}>
                        <option value="">Select a map group</option>
                        {mapGroupOptions.map(name => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>

                    <label><b>Description:</b></label>
                    <input className="modal-input" value={description} onChange={e => setDescription(e.target.value)} />

                    <label><b>Tags:</b></label>
                    <input className="modal-input" value={tags} onChange={e => setTags(e.target.value)} />

                    <label><b>Plugins:</b></label>
                    <Select
                        unstyled
                        isMulti
                        value={plugins.map(p => ({ label: p, value: p }))}
                        options={availablePlugins.map(p => ({ label: p, value: p }))}
                        onChange={(selected) => setPlugins(selected.map(s => s.value))}
                        placeholder="Select plugins..."
                        className="modal-select"
                        classNamePrefix="select"
                    />

                    <label><b>Command Packs:</b></label>
                    <Select
                        unstyled
                        isMulti
                        value={commandPacks.map(p => ({ label: p, value: p }))}
                        options={availableCommandPacks.map(p => ({ label: p, value: p }))}
                        onChange={(selected) => setCommandPacks(selected.map(s => s.value))}
                        placeholder="Select command packs..."
                        className="modal-select"
                        classNamePrefix="select"
                    />
                    {Object.entries(settings).map(([section, fields]) => {
                        // Handle special case where customCommands is at root level
                        if (section === 'customCommands') {
                            return (
                                <details key="customCommands" style={{ marginTop: '16px' }}>
                                    <summary><b>Custom Commands</b></summary>
                                    <div className="json-field" style={{ marginTop: '12px' }}>
                                        <textarea
                                            id="customCommands"
                                            className="modal-textarea"
                                            value={fields.join('\n')}
                                            onChange={e => {
                                                const cmds = e.target.value
                                                    .split(/[\n;]/)
                                                    .map(s => s.trim())
                                                    .filter(Boolean);
                                                updateSettingField('customCommands', null, cmds);
                                            }}
                                            style={{ minHeight: '200px', resize: 'vertical' }}
                                        />
                                    </div>
                                </details>
                            );
                        }

                        // Handle normal sections
                        return (
                            <details key={section} style={{ marginTop: '16px' }}>
                                <summary><b>{section.charAt(0).toUpperCase() + section.slice(1)} Settings</b></summary>
                                {Object.entries(fields).map(([key, value]) => (
                                    <div key={key} className="json-field">
                                        <div className="setting-label">
                                            <label htmlFor={`${section}-${key}`}>{key}</label>
                                            <label title={settingDescriptions[key] || 'No description available'}>
                                                <Info className="info-icon" size={15} />
                                            </label>
                                        </div>
                                        <input
                                            className="modal-input"
                                            value={value ?? ''}
                                            onChange={e => updateSettingField(section, key, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </details>
                        );
                    })}

                </div>
            </div>
        </div>
    );
}
