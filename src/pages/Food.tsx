import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { foodService, type Receita } from "../services/foodService";
import "../styles/Food.css";


const FoodPage: React.FC = () => {
  const [foods, setFoods] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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



  return (
    <>
      <Header/>

      <h1 className="food-title">Livro de Receitas</h1>
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
              <button className="btn-details">Ver detalhes</button>
              <button className="btn-add">Adicionar às tarefas</button>
            </div>
          </div>
        )
        ))}
      </div>

      <Footer />
    </>
  );
};

export default FoodPage;
