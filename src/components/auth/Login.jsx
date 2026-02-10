// Suvarna

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo1.png";
import { login } from "../../api/authService";
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Email validation - checks format
  const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEmailError("");
    setPasswordError("");
    setServerError("");

    let hasClientError = false;

    // Client-side validation
    if (!email.trim()) {
      setEmailError("Email address is required");
      hasClientError = true;
    } else if (!isValidEmailFormat(email)) {
      setEmailError("Invalid email address");
      hasClientError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasClientError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasClientError = true;
    }

    // If there are client-side errors, don't call the API
    if (hasClientError) {
      setLoading(false);
      return;
    }

    // Call API if client validation passes
    try {
      const response = await login(email, password);

      console.log("✅ Login successful:", response);

      // Redirect to dashboard
     navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("❌ Login error:", err);

      // Extract EXACT error message from backend - no modifications
      const message =
        err.response?.data?.error || "Invalid email or password";
      setServerError(message);

      // Clear password on server error (security best practice)
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Agrowmart Logo"
            className="h-16 w-auto object-contain"
          />
        </div>
        <h1 className="text-center text-2xl font-semibold mb-1">
          Agrowmart Admin Portal
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign in to your account
        </p>

        {/* Server Error Message (Backend errors) */}
        {serverError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left">
              Email address
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
                setServerError("");
              }}
              placeholder="Enter your email"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                emailError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500"
              }`}
              disabled={loading}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {emailError}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1 text-left">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                  setServerError("");
                }}
                placeholder="Enter your password"
                className={`w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-green-500"
                }`}
                disabled={loading}
              />

              {/* Eye Icon - Toggle Password Visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex="-1"
                disabled={loading}
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {passwordError}
              </p>
            )}

            {/* Forgot Password Link */}
            <div className="text-right mt-2">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-green-600 hover:underline focus:outline-none"
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
