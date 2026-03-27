import {
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { signIn } from "../lib/Auth";

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);

      toast.success("Signed in successfully");
      setSuccessModal(true);
      reset();

      setTimeout(() => {
        setSuccessModal(false);
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Invalid email or password",error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6">
      {/* CARD */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-full max-w-md
          bg-white/15 backdrop-blur-xl
          border border-white/20
          shadow-2xl
          rounded-2xl
          px-6 py-6 sm:px-8 sm:py-8
          text-white
        "
      >
        {/* HEADER */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
          </div>
          <p className="text-sm text-white/70 text-center">
            Sign in to continue to Dawood Shop 2
          </p>
        </div>

        {/* FORM */}
        <div className="flex flex-col gap-4">
          {/* EMAIL */}
          <InputField
            label="Email"
            icon={Mail}
            placeholder="Email address"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
            error={errors.email}
          />

          {/* PASSWORD */}
          <PasswordField
            label="Password"
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            register={register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            error={errors.password}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full py-3 mt-2
              rounded-xl
              bg-gradient-to-r from-orange-400 to-orange-600
              hover:from-orange-500 hover:to-orange-700
              font-semibold
              flex items-center justify-center gap-2
              transition
              disabled:opacity-60
            "
          >
            {isLoading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-white/70">
            Don’t have an account?
            <Link to="/signup" className="text-cyan-400 underline ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </form>

      {/* SUCCESS MODAL */}
      {successModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 text-center space-y-3 relative max-w-sm w-full">
            <h3 className="text-lg font-bold text-green-600">
              Login Successful
            </h3>
            <p>You are being redirected.</p>
            <button
              onClick={() => setSuccessModal(false)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------- REUSABLE INPUTS ---------- */

const InputField = ({ label, icon: Icon, placeholder, register, error }) => (
  <div>
    <label className="text-sm">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-3.5 w-5 h-5 text-white/70" />
      <input
        {...register}
        placeholder={placeholder}
        className="
          w-full h-11 pl-11
          bg-white/10 border border-white/20
          rounded-xl text-white placeholder-white/60
          focus:ring-2 focus:ring-cyan-400 outline-none
        "
      />
    </div>
    {error && <p className="text-red-400 text-sm">{error.message}</p>}
  </div>
);

const PasswordField = ({ label, show, toggle, register, error }) => (
  <div>
    <label className="text-sm">{label}</label>
    <div className="relative">
      <Lock className="absolute left-3 top-3.5 w-5 h-5 text-white/70" />
      <input
        type={show ? "text" : "password"}
        {...register}
        className="
          w-full h-11 pl-11 pr-10
          bg-white/10 border border-white/20
          rounded-xl text-white
          focus:ring-2 focus:ring-cyan-400 outline-none
        "
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-3.5 text-white/70"
      >
        {show ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
    {error && <p className="text-red-400 text-sm">{error.message}</p>}
  </div>
);
