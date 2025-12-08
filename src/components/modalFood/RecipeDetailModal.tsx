import React from 'react';
import type { Receita } from '../../services/foodService'; 
import '../../styles/ModalsTask.css';

interface RecipeDetailModalProps {
    isOpen: boolean;
    receita: Receita | null;
    onClose: () => void;
    onAddTask: (receita: Receita) => void; 
}

const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ 
    isOpen, 
    receita, 
    onClose,
    onAddTask
}) => {
    if (!isOpen || !receita) {
        return null;
    }

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleAddTaskClick = () => {
        onAddTask(receita);
        onClose(); 
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={handleContentClick} style={{ maxWidth: '600px' }}>
                <h3>🍽️ Detalhes da Receita: {receita.receita}</h3>
                
                <p><strong>Tipo:</strong> {receita.tipo}</p>
                
                <div style={{ marginBottom: '15px' }}>
                    <h4>Ingredientes</h4>
                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
                        {receita.ingredientes}
                    </p>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <h4>Modo de Preparo</h4>
                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
                        {receita.modo_preparo}
                    </p>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        Fechar
                    </button>
                    <button className="addFoodInTask-btn" onClick={handleAddTaskClick}>
                        + Adicionar como Tarefa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailModal;