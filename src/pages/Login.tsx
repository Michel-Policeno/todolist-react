import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import logo from "../assets/react.svg";
import "../styles/LoginPage.css"

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await auth.login(email, password);
      navigate("/tasks"); 
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro no login");
    }
  };

  return (
        <>
            <div className="gradient-bg"></div>

            <div className="login-wrapper">
                <div className="loginContainer">
                    <div className="loginBox">
                        <img
                            src={logo}
                            alt="Logo"
                            className="logoImg"
                        />

                        <h2 className="titlePortal">Lista de Tarefas</h2>
                        <p className="pPortal">Insira seus dados para acessar a plataforma</p>

                        <form onSubmit={submit}>
                            <div className="inputGroup">
                                <label htmlFor="email">E-mail:</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Digite seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="inputGroup senhaGroup">
                                <label htmlFor="senha">Senha:</label>
                                <input
                                    type="password"
                                    id="senha"
                                    placeholder="Digite seu senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                              </div>


                            {error && (
                                <p className="error-message">
                                    {error}
                                </p>
                            )}

                            <button type="submit" className="btnLogin">
    Entrar
  </button>

                           </form>
                    </div>
                </div>
            </div>
        </>
  );
};

export default LoginPage;
