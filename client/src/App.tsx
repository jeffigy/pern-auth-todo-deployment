import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import LandingPage from "./components/LandingPage";

function App(props: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (bool: boolean) => {
    setIsAuthenticated(bool);
  };

  async function isAuth() {
    try {
      const response = await fetch("/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      // parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      setIsAuthenticated(parseRes === true);
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
          path="/"
          element={
            !isAuthenticated ? (
              <LandingPage />
            ) : (
              <Navigate to="/dashboard" replace={true} />
            )
          }
        />
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
