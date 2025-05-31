import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext"; // adjust the path if needed
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const onSubmit = async (data: SignupFormValues) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup(data.email, data.password, {
        name: data.fullName,
      });
      toast.success("Signup successful! Redirecting to signin page...");
      navigate("/login"); // redirect after signup
    } catch (err) {
      toast.error("Signup failed. Please try again.");

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create account");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              {...register("fullName", { required: "Full name is required" })}
              placeholder="Enter FullName"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Your Email <span className="text-red-600">*</span>
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              placeholder="name@example.com"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Enter Password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-teal-500 hover:underline font-medium"
          >
            Login
          </a>
        </p>

        <p className="mt-6 text-center text-xs text-gray-400">
          © Copyright 2025{" "}
          <span className="font-semibold text-gray-600">Swiftcargo</span> All
          Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Signup;
