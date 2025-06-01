import { createContext, useContext, useState } from 'react';
import '../style/Modal.css';

const PromptModalContext = createContext();

export function usePromptModal() {
    return useContext(PromptModalContext);
}

export function PromptModalProvider({ children }) {
    const [state, setState] = useState({
        isOpen: false,
        title: '',
        message: '',
        defaultValue: '',
        resolve: () => {},
    });
    const [value, setValue] = useState('');

    const prompt = ({ title, message, defaultValue = '' }) => {
        return new Promise((resolve) => {
            setState({
                isOpen: true,
                title,
                message,
                defaultValue,
                resolve,
            });
            setValue(defaultValue);
        });
    };

    const close = () => {
        setState(prev => ({ ...prev, isOpen: false }));
    };

    const submit = () => {
        state.resolve(value);
        close();
    };

    return (
        <PromptModalContext.Provider value={{ prompt }}>
            {children}
            {state.isOpen && (
                <div className="modal-backdrop">
                    <div className="modal-box">
                        <h2>{state.title}</h2>
                        {state.message && <p>{state.message}</p>}
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="modal-input"
                            style={{
                                width: '100%',
                                marginTop: '12px',
                                padding: '8px',
                                borderRadius: '6px',
                                backgroundColor: '#2b2b3d',
                                border: '1px solid #444',
                                color: 'white'
                            }}
                        />
                        <div className="modal-actions">
                            <button className="modal-button kick" onClick={submit}>Save</button>
                            <button className="modal-button cancel" onClick={() => close()}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </PromptModalContext.Provider>
    );
}
