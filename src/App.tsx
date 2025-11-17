import React from "react";
import { BrowserRouter, Routes, Route, Navigate, redirect } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import LoginPage from "./pages/Login";
import TaskPage from "./pages/Task";

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const auth = useAuth();
  return auth.isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                {<TaskPage />}
              </PrivateRoute>
            }
          />
          <Route path="/*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
