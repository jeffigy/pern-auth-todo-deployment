import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";

function App(props: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (bool: boolean) => {
    setIsAuthenticated(bool);
  };
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <Login {...props} setAuth={setAuth} />
          ) : (
            <Navigate to="/dashboard" replace={true} />
          )
        }
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? (
            <Register {...props} setAuth={setAuth} />
          ) : (
            <Navigate to="/dashboard" replace={true} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            <Dashboard {...props} setAuth={setAuth} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
