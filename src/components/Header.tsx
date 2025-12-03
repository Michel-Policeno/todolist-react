import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import "../styles/Header.css";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className="header">
      <button onClick={() => navigate("/home")} className="btn-home">
        Home
      </button>

      <button onClick={() => navigate("/tasks")} className="btn-tarefas">
        Tarefas
      </button>

      <button onClick={() => navigate("/foods")} className="btn-receitas">
        Receitas
      </button>

      <button onClick={() => navigate("/movies")} className="btn-filmes">
        Filmes/Series
      </button>

      <div className="user-controls">
        <button onClick={logout} className="btn-logout">
          Sair
        </button>
      </div>
    
    </header>
  );
};

export default Header;
