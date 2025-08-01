import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../Appwrite/auth";
import { Button, Input, Logo } from "../components";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const create = async (data) => {
  setError("");
  setIsSubmitting(true);
  try {
    const user = await authService.createAccount(data);
    if (user) navigate("/login");
  } catch (err) {
    setError(err?.message || "Signup failed. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-3">
          <Logo width="60px" />
        </div>

        <h3 className="text-center mb-3">Sign Up</h3>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit(create)} className="  d-grid gap-3 ">
          <Input
            className= "form-control "
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
             style={{ borderRadius: "8px" }}
          />
          {errors.name && <div className="text-danger small border-dark border-2">{errors.name.message}</div>}

          <Input
            classname=" form-control border-dark border-1";
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Enter a valid email",
              },
            })}
             style={{ borderRadius: "8px" }}
          />
          {errors.email && <div className="text-danger small">{errors.email.message}</div>}

          <Input
            className=" form-control border-dark border-1";
            label="Password"
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
             minLength: {
              value: 8,
              message: "Minimum 8 characters required",
             }

            })}
             style={{ borderRadius: "8px" }}
          />
          {errors.password && <div className="text-danger small">{errors.password.message}</div>}

          <Button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Signup;





