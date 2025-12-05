import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal"
import { taskService, type Task } from "../services/taskService";
import "../styles/Tasks.css"

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Buscar as tarefas 
  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const data = await taskService.getAll();
        setTasks(data);
      } catch (err) {
        setError("Erro ao carregar tarefas");
      } finally {
        setLoading(false);
      }
    };

    getAllTasks();
  }, []);

  // Criar nova tarefa
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const created = await taskService.create({ nome: newTask });
      setTasks((prev) => [...prev, created]);
      setNewTask("");
    } catch (err) {
      alert("Erro ao criar tarefa");
    }
  };

  // Marcar como concluída
  const handleToggleCheck = async (id: string) => {
    try {
      const taskToggle = await taskService.toggle(id)
      setTasks((prev) => prev.map(t => t.id === id ? taskToggle : t));
    } catch {
      alert("Erro ao atualizar tarefa");
    }
  };

// 🛑 SUBSTITUIR A FUNÇÃO handleDelete EXISTENTE
 const handleDelete = (task: Task) => { // Aceita a tarefa completa (ou ID e Nome)
  setTaskToDelete(task);
  setIsModalOpen(true);
 };

// ⬅️ NOVA FUNÇÃO PARA EXECUTAR A EXCLUSÃO
  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await taskService.delete(taskToDelete.id!);
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      
    } catch {
      alert("Erro ao excluir tarefa");
      
    } finally {
      // Sempre fecha e reseta o estado após a tentativa
      setIsModalOpen(false);
      setTaskToDelete(null);
    }
  };

  return (
    <>
      <Header/>

      <main className="tasks-container">
        <div className="new-task-bar">
          <input
            type="text"
            placeholder="Digite uma nova tarefa..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Adicionar</button>
        </div>

        {loading ? (
          <p>Carregando tarefas...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <ul className="task-list">
            {tasks.length === 0 && <p>Nenhuma tarefa encontrada.</p>}
            {tasks.map((task) => (
              <li key={task.nome} className={task.realizado ? "completed" : ""}>
               <div className="task-info">
                <input
                  type="checkbox"
                  checked={task.realizado || false}
                  onChange={() => handleToggleCheck(task.id!)}
                />
                <span>{task.nome}</span>
                </div>

                <div className="task-actions">
                  <button className="edit-btn">✏️</button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(task)}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />

      {/* ⬅️ RENDERIZAR O MODAL AQUI */}
      <DeleteConfirmationModal
          isOpen={isModalOpen}
          // Passa o nome para o modal ter contexto (usa "" se for null)
          onConfirm={handleConfirmDelete}
          onCancel={() => {
              setIsModalOpen(false);
              setTaskToDelete(null); // Limpa o estado se cancelar
          }}
      />
    </>
  );
};

export default TasksPage;
