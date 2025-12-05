import React from 'react';
import '../styles/DeleteConfirmationModal.css';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) {
        return null;
    }

    // Previna o fechamento acidental ao clicar no conteúdo do modal
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={handleContentClick}>
                <h3>⚠️ Confirmar Exclusão</h3>
                <p>Tem certeza de que deseja excluir a tarefa?</p>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className="confirm-btn" onClick={onConfirm}>
                        Sim, Excluir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;