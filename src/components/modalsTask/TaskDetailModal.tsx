import React from 'react';
import type { Task } from '../../services/taskService';
import '../../styles/ModalsTask.css';
import Linkify from 'react-linkify'

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
                <div>
                    <strong>Descrição:</strong>
                    <div className="modal-description-text">
                        <Linkify properties={{ target: '_blank', style: { color: '#007bff', fontWeight: 'bold' } }}>
                            {task.descricao || 'Sem descrição'}
                        </Linkify>
                    </div>
                </div>
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