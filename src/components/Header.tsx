import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import "../styles/Header.css";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { logout } = useAuth();
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light");

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <header className="header">
      <div className="logo">App de Tarefas</div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar tarefas..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>

      <div className="user-controls">
        <span className="username">Olá, Michel</span>
        {/* <button onClick={handleThemeToggle} className="btn-theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button> */}
        <button onClick={logout} className="btn-logout">
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
