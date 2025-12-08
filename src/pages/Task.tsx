import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DeleteConfirmationModal from "../components/modalsTask/DeleteConfirmationModal"
import TaskDetailModal from "../components/modalsTask/TaskDetailModal";
import TaskEditModal from "../components/modalsTask/TaskEditModal";
import { taskService, type Task } from "../services/taskService";
import { toast } from 'react-toastify'
import "../styles/Tasks.css"

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDetail, setTaskToDetail] = useState<Task | null>(null);

  const handleViewDetails = (task: Task) => {
    setTaskToDetail(task);
    setIsDetailModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedTask: Task) => {
    try {
      const savedTask = await taskService.update(updatedTask.id!, updatedTask);

      setTasks((prev) =>
        prev.map(t => (t.id === savedTask.id) ? savedTask : t)
      );

      setIsEditModalOpen(false);
      setTaskToEdit(null);

    } catch (err) {
      toast.error("Erro ao salvar edição da tarefa");
    }
  };

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
      toast.error("Erro ao criar tarefa");
    }
  };

  // Marcar como concluída
  const handleToggleCheck = async (id: string) => {
    try {
      const taskToggle = await taskService.toggle(id)
      setTasks((prev) => prev.map(t => t.id === id ? taskToggle : t));
    } catch {
      toast.error("Erro ao atualizar tarefa");
    }
  };

  // abri modal de delete 
  const handleDelete = (task: Task) => {
    setTaskToDelete(task);
    setIsModalOpen(true);
  };

  // função para delete
  const handleConfirmDelete = async () => {
    if (!taskToDelete) return;

    try {
      await taskService.delete(taskToDelete.id!);
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));

    } catch {
      toast.error("Erro ao excluir tarefa");

    } finally {
      setIsModalOpen(false);
      setTaskToDelete(null);
    }
  };

  return (
    <>
      <Header />

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
            {tasks
              .slice()
              .sort((a, b) => {
                const prioridadeA = a.prioridade || 0;
                const prioridadeB = b.prioridade || 0;

                if (prioridadeA !== prioridadeB) {
                  return prioridadeB - prioridadeA; 
                }
                return 0;
              })
              .map((task) => (
                <li key={task.nome} className={task.realizado ? "completed" : ""}>
                  <div className="task-info">
                    <input
                      type="checkbox"
                      checked={task.realizado || false}
                      onChange={() => handleToggleCheck(task.id!)}
                    />
                   <span onClick={() => handleViewDetails(task)} style={{ cursor: 'pointer' }}>
                      {task.nome}
                    </span>
                  </div>

                  <div className="task-actions">
                    <button className="open-btn" onClick={() => handleViewDetails(task)}>👁️</button>
                    <button className="edit-btn" onClick={() => handleOpenEdit(task)}>✏️</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(task)}
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </main>

      <Footer />

      {/* modal delete */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsModalOpen(false);
          setTaskToDelete(null);
        }}
      />
      {/* modal detalhes */}
      <TaskDetailModal
        isOpen={isDetailModalOpen}
        task={taskToDetail}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* modal edição */}
      <TaskEditModal
        isOpen={isEditModalOpen}
        task={taskToEdit}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default TasksPage;
