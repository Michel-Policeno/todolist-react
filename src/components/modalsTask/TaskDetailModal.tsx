// components/TaskDetailModal.tsx
import React from 'react';
import type { Task } from '../../services/taskService'; 
import '../../styles/ModalsTask.css';

interface TaskDetailModalProps {
    isOpen: boolean;
    task: Task | null;
    onClose: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ isOpen, task, onClose }) => {
    if (!isOpen || !task) {
        return null;
    }

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const priorityText = task.prioridade === 2 ? 'Alta' : task.prioridade === 1 ? 'Média' : 'Baixa';

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={handleContentClick}>
                <h3>📋 Detalhes da Tarefa</h3>
                                
                <p><strong>Nome:</strong> {task.nome}</p>
                <p><strong>Descrição:</strong> {task.descricao || 'Sem descrição'}</p>
                <p><strong>Prioridade:</strong> {priorityText || 'N/A'}</p>
                <p><strong>Status:</strong> {task.realizado ? 'Concluída' : 'Pendente'}</p>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailModal;