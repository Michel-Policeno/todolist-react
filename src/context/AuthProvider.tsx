import type { ReactNode } from "react";
import { createContext, useState, useContext } from "react";
import { api } from "../services/api";

type AuthContextType = {
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("accessToken"));

  const login = async (email: string, senha: string) => {
    try {
        const responseLogin = await api.post("/auth/login", { email, senha });
        const receivedToken = responseLogin.data.token;
        localStorage.setItem("accessToken", receivedToken);
        setToken(receivedToken);
    
    } catch (error) {
        console.error("Login failed:", error);
        localStorage.removeItem('accessToken'); 
        throw new Error("Falha ao autenticar");
    }

  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro do AuthProvider");
  return ctx;
};
