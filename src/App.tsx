import React from "react";
import { BrowserRouter, Routes, Route, Navigate, redirect } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import TaskPage from "./pages/Task";
import FoodPage from "./pages/Food";

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const auth = useAuth();
   if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }
  return children;
};

function App() {
return (
    <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
              <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rotas privadas */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                {<Home/>}
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                {<TaskPage />}
              </PrivateRoute>
            }
          />
          <Route
            path="/foods"
            element={
              <PrivateRoute>
              
                {<FoodPage />}
              </PrivateRoute>
            }
          />
          {/* Redireciona qualquer rota inválida pro login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
