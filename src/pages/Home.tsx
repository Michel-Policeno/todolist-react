import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Header onSearch={setSearchQuery} />

      <main className="home-container">
        <div className="home-card" onClick={() => navigate("/tasks")}>
          <h2>Tarefas</h2>
          <p>Gerencie suas lista de tarefas</p>
        </div>

        <div className="home-card" onClick={() => navigate("/foods")}>
          <h2>Receitas</h2>
          <p>Escolha sua próxima receita</p>
        </div>
      
          <div className="home-card" onClick={() => navigate("/movies")}>
          <h2>Filmes e Series</h2>
          <p>Veja onde assistir seu filme ou serie favorita</p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;