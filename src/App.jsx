 import "./App.css";
import React, { useState, useEffect } from "react";
import { Login , logout } from "./store/authSlice";
import { Header, Footer, Container } from "./components"; 
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./Appwrite/auth";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
        dispatch(Login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h2 className="text-muted">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 py-4">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
