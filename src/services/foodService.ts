import { api } from "./api";

export interface IngredienteBase {
  id: number;
  nomesIngrediente: string[];
  receita_id: number;
  created_at: string;
}

export interface Receita {
  id: number;
  receita: string; 
  ingredientes: string; 
  tipo: string;
  modo_preparo: string;
  link_imagem: string;
  created_at: string;
  IngredientesBase: IngredienteBase[];
}

export interface ReceitaResponse {
  items: Receita[];
}

export const foodService = {

  async getAll(): Promise<ReceitaResponse> {
    try {
      const { data } = await api.get("/foods/");
      return data;
    } catch (error: any) {
      console.error("Erro ao buscar receitas:", error);
      throw new Error("Falha ao buscar receitas.");
    }}
} 