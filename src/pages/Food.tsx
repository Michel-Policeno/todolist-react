import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { foodService, type Receita } from "../services/foodService";
import "../styles/Food.css";


const FoodPage: React.FC = () => {
  const [foods, setFoods] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

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

  const filteredFoods = foods.filter((f) =>
    f.receita.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header onSearch={setSearch} />

      <h1 className="food-title">Livro de Receitas</h1>
      <div className="foods-grid">
        {loading ? (
          <p>Carregando tarefas...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
        filteredFoods.map((item) => (
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
