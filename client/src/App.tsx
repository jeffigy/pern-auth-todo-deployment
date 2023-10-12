import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";

function App(props: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (bool: boolean) => {
    setIsAuthenticated(bool);
  };
  const navigate = useNavigate();

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      // console.log(parseRes);
    } catch (err: any) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
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
      <Toaster />
    </>
  );
}

export default App;
