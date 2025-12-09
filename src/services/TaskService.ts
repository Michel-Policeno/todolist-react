// ta dificil
import { api } from "./api";

export interface Task {
  id?: string;
  nome: string;
  descricao?: string;
  prioridade?:number;
  realizado?: boolean;
}

export const taskService = {

  async getAll(): Promise<Task[]> {
    try {
      const { data } = await api.get("/tasks");
      return data;
    } catch (error: any) {
      console.error("Erro ao buscar tarefas:", error);
      throw new Error("Falha ao buscar tarefas.");
    }
  },

  async findTask(id: string): Promise<Task>{
    try {
      const {data} = await api.get(`/tasks/${id}`)
      return data;
    } catch (error: any) {
      console.error("Erro ao buscar tarefa:", error);
      throw new Error("Falha ao buscar tarefa.");
    }
  },

  async create(task: Task): Promise<Task> {
    try {
      const { data } = await api.post("/tasks", task);
      return data;
    } catch (error: any) {
      console.error("Erro ao criar tarefa:", error);
      throw new Error("Falha ao criar tarefa.");
    }
  },

  async update(id: string, task: Task): Promise<Task> {
    try {
      const { data } = await api.put(`/tasks/${id}`, task);
      return data;
    } catch (error: any) {
      console.error("Erro ao atualizar tarefa:", error);
      throw new Error("Falha ao atualizar tarefa.");
    }
  },

  async toggle(id: string): Promise<Task> {
    try {
     const { data } = await api.patch(`/tasks/${id}/toggle`);
     return data 
    } catch (error: any) {
      console.error("Erro ao alternar realizado/feito da tarefa:", error);
      throw new Error("Falha ao alternar realizado/feito da tarefa.");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error: any) {
      console.error("Erro ao excluir tarefa:", error);
      throw new Error("Falha ao excluir tarefa.");
    }
  },
};
