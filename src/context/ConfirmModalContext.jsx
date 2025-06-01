import { createContext, useContext, useState } from 'react';
import "../style/Modal.css";

const ConfirmModalContext = createContext();

export function useConfirmModal() {
    return useContext(ConfirmModalContext);
}

export function ConfirmModalProvider({ children }) {
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        content: '',
        onConfirm: null
    });

    const confirm = ({ title, content, onConfirm }) => {
        setModalState({
            isOpen: true,
            title,
            content,
            onConfirm
        });
    };

    const close = () => {
        setModalState(prev => ({ ...prev, isOpen: false }));
    };

    const confirmAndClose = () => {
        if (modalState.onConfirm) modalState.onConfirm();
        close();
    };

    return (
        <ConfirmModalContext.Provider value={{ confirm }}>
            {children}
            {modalState.isOpen && (
                <div className="modal-backdrop">
                    <div className="modal-box">
                        <h2>{modalState.title}</h2>
                        <div className="modal-content">{modalState.content}</div>
                        <div className="modal-actions">
                            <button className="modal-button kick" onClick={confirmAndClose}>Confirm</button>
                            <button className="modal-button cancel" onClick={close}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmModalContext.Provider>
    );
}
