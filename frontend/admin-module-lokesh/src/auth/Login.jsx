import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/app-logos/logo.png";
import { login } from "./authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = login(email, password);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0B1220]">

      {/* ===== HEADER (SAME AS SIGNUP) ===== */}
      <div className="w-full px-4 py-4 flex items-start justify-between">
        {/* LEFT: LOGO */}
        <img
          src={logo}
          alt="VerifiedWork"
          className="h-20 object-contain"
        />

        {/* RIGHT: CONTACT INFO */}
        <div className="text-right text-base text-gray-700 dark:text-gray-300">
          <p className="font-medium flex items-center justify-end gap-2">
            📞 +91 90000 00000
          </p>
          <p className="flex items-center justify-end gap-2">
            ✉️ info@verifiedwork.com
          </p>
        </div>
      </div>

      {/* ===== LOGIN CARD ===== */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white dark:bg-[#111A2E]
                        rounded-xl shadow-lg p-8">

          {/* BRAND TEXT */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Freelance Manager
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage projects, productivity & teams
            </p>
          </div>

          <h2 className="text-lg font-semibold mb-4 
                         text-gray-700 dark:text-gray-200">
            Login
          </h2>

          <input
            className="w-full p-3 rounded-lg border 
                       bg-gray-50 dark:bg-[#1E293B]
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 rounded-lg border mt-3
                       bg-gray-50 dark:bg-[#1E293B]
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full mt-6 py-3 rounded-lg
                       bg-blue-600 hover:bg-blue-700
                       text-white font-medium transition"
          >
            Login
          </button>

          {/* FOOTER */}
          <div className="text-center mt-4 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Don’t have an account?
            </span>{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
