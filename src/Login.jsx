 import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Login as authlogin } from "./store/authSlice";
import { Button, Input, Logo } from "./components/index";
import { useDispatch } from "react-redux";
import authService from "./Appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    console.log("📦 Submitted form data:", data);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authlogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      console.log("🔍 login data:", data);

    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(90deg, #FDBB2D 0%, #3A1C71 100%)",
      }}
    >
      <div
        className="bg-white p-5 rounded shadow"
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div className="text-center mb-4">
          <Logo />
        </div>

        <h3 className="text-center fw-bold mb-3">Login to Postify</h3>

        {error && (
          <p className="text-danger text-center fw-semibold mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit(login)}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be valid",
                },
              })}
              className="form-control px-3 py-2"
              style={{ borderRadius: "8px" }}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "password is required",
              })}
              className="form-control px-3 py-2"
              style={{ borderRadius: "8px" }}
            />
          </div>

          <Button type="submit" className="w-100">
            Login
          </Button>
        </form>

        <p className="mt-3 text-center">
          Don’t have an account?{" "}
          <Link to="/Signup" className="fw-semibold" style={{ color: "#3A1C71" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;


