import React from "react";
import { BrowserRouter, Routes, Route, Navigate, redirect } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import LoginPage from "./pages/Login";
import TaskPage from "./pages/Task";

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
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rotas privadas */}
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                {<TaskPage />}
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
