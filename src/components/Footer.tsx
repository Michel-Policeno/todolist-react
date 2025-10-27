import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} TodoApp — Desenvolvido por Michel Policeno</p>
    </footer>
  );
};

export default Footer;
