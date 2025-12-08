import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecipeDetailModal from "../components/modalFood/RecipeDetailModal"
import { foodService, type Receita } from "../services/foodService";
import { taskService, type Task } from "../services/taskService";
import { toast } from 'react-toastify'
import "../styles/Food.css";


const FoodPage: React.FC = () => {
  const [foods, setFoods] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedReceita, setSelectedReceita] = useState<Receita | null>(null);

  useEffect(() => {
    const loadFood = async () => {
      try {
        const response = await foodService.getAll();
        setFoods(response.items);
      } catch (err) {
        setError("Falha ao carregar receitas");
      } finally {
        setLoading(false);
      }
    };

    loadFood();
  }, []);

  const handleViewDetails = (receita: Receita) => {
    setSelectedReceita(receita);
    setIsDetailModalOpen(true);
  };

  const handleAddTask = async (receita: Receita) => {
       try {
        await taskService.create({
        nome: `Preparar: ${receita.receita}`,
        descricao: receita.modo_preparo,
       });
     toast.success(`Tarefa "${receita.receita}" adicionada com sucesso!`);
    } catch (err) {
      toast.error("Erro ao adicionar a receita como tarefa.");
    }
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedReceita(null);
  }
  return (
    <>
      <Header />

      <div className="foods-grid">
        {loading ? (
          <p>Carregando receitas...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          foods.map((item) => (
            <div className="food-card" key={item.id}>
              <img
                src={item.link_imagem}
                alt={item.receita}
                className="food-img"
              />

              <h3 className="food-name">{item.receita}</h3>

              <div className="food-actions">
                <button
                  className="btn-details"
                  onClick={() => handleViewDetails(item)}
                >
                  Ver detalhes
                </button>
                <button
                  className="btn-add"
                  onClick={() => handleAddTask(item)}
                >
                  Adicionar às tarefas
                </button>
              </div>
            </div>
          )
          ))}
      </div>

      <Footer />
      {/* modal detalhes receita */}
      <RecipeDetailModal
          isOpen={isDetailModalOpen}
          receita={selectedReceita}
          onClose={handleCloseModal}
          onAddTask={handleAddTask}
      />
    </>
  );
};

export default FoodPage;
