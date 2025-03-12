"use client";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import React, { useState } from "react";
import MainLayout from "@/layouts/mainLayout";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/auth/register", JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" }
      });

      if (res.status === 200) {
        setSuccess(res.data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        setError("");
      } else {
        setError(res.data.message);
        setSuccess("");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.response?.data?.message || "An error occurred.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center px-4 pb-10 pt-[150px]">
        <div className="flex flex-col items-center gap-4 border-2 border-[#0093E8] bg-[#0D0B13] rounded-3xl p-10 w-full mx-auto">
          <h1 className="bg-gradient-to-r from-[#21ABFD] to-[#0055DE] bg-clip-text text-transparent font-bold text-2xl">
            Chronedo.AI
          </h1>

          {success && <p className="text-green-500">{success}</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <div className="flex items-center text-normal cursor-pointer hover:bg-gray-700 transition-all border-2 border-gray-700 rounded-xl p-2 gap-2">
              <FontAwesomeIcon icon={faGoogle} className="w-5 h-5 text-gray-500" />
              <p className="text-white">Continue with Google</p>
            </div>

            <div className="flex items-center text-normal cursor-pointer hover:bg-gray-700 transition-all border-2 border-gray-700 rounded-xl p-2 gap-2">
              <FontAwesomeIcon icon={faApple} className="w-5 h-5 text-gray-500" />
              <p className="text-white">Continue with Apple</p>
            </div>
          </div>

          {/* Or continue with */}
          <div className="flex items-center w-full gap-2">
            <div className="flex-1 h-[1px] bg-gray-700"></div>
            <p className="text-gray-500 text-sm whitespace-nowrap">Or continue with</p>
            <div className="flex-1 h-[1px] bg-gray-700"></div>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 w-full max-w-[400px] mx-auto">
            {/* Name Input */}
            <div className="w-full flex items-center gap-3 border-2 border-gray-700 rounded-xl p-3 bg-transparent">
              <UserIcon className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              />
            </div>

            {/* Email Input */}
            <div className="w-full flex items-center gap-3 border-2 border-gray-700 rounded-xl p-3 bg-transparent">
              <EnvelopeIcon className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="w-full flex items-center gap-3 border-2 border-gray-700 rounded-xl p-3 bg-transparent">
              <LockClosedIcon className="w-5 h-5 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              />
              {!showPassword ? (
                <EyeSlashIcon
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeIcon
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="w-full flex items-center gap-3 border-2 border-gray-700 rounded-xl p-3 bg-transparent">
              <LockClosedIcon className="w-5 h-5 text-gray-500" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none"
              />
              {!showConfirmPassword ? (
                <EyeSlashIcon
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <EyeIcon
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#21ABFD] to-[#0055DE] text-white font-semibold cursor-pointer hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>

          <p className="text-white text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-[#0093E8] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignUp;
