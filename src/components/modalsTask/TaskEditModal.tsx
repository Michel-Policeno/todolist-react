import React, { useState, useEffect } from 'react';
import type { Task } from '../../services/TaskService';
import '../../styles/ModalsTask.css';

interface TaskEditModalProps {
    isOpen: boolean;
    task: Task | null;
    onClose: () => void;
    onSave: (updatedTask: Task) => void;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({ isOpen, task, onClose, onSave }) => {
    const [editedTask, setEditedTask] = useState<Task | null>(task);

    // Atualiza o estado interno sempre que a 'task' prop mudar
    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    
    if (!isOpen || !editedTask) {
        return null;
    }

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        setEditedTask(prev => ({
            ...prev!,
            [name]: (name === 'prioridade') 
                ? Number(value) 
                : value
        }));
    };

    const handleSave = () => {
        if (editedTask.nome.trim()) {
            onSave(editedTask);
        } else {
            alert("O nome da tarefa não pode estar vazio.");
        }
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={handleContentClick}>
                <h3>✏️ Editar Tarefa</h3>
                
                <form>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" name="nome" value={editedTask.nome} onChange={handleChange} required />
                    </div>
                    
                    <div className="form-group">
                        <label>Descrição:</label>
                        <textarea name="descricao" value={editedTask.descricao || ''} onChange={handleChange as any} rows={3} />
                    </div>
                    
                    <div className="form-group">
                        <label>Prioridade:</label>
                        <select name="prioridade" value={editedTask.prioridade || 0} onChange={handleChange as any}>
                            <option value={2}>Alta</option>
                            <option value={1}>Média</option>
                            <option value={0}>Baixa</option>
                        </select>
                    </div>

                </form>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="confirm-btn" onClick={handleSave}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskEditModal;