import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

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
      console.log('deu certo')
      navigate("/tasks"); 
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro no login");
    }
  };

  return (
    <div className="container mt-5 w-50">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
        </div>
        <div className="mb-2">
          <label className="form-label">Senha</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100" type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
