import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/app-logos/logo.png";
import bgImage from "../assets/background.png";
import { login } from "./authService";
import { FcGoogle } from "react-icons/fc";

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
    <div
      className="min-h-screen bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen bg-black/60 flex flex-col">

        {/* HEADER */}
        <div className="w-full px-6 py-4 flex justify-between items-center">
          <img src={logo} alt="VerifiedWork" className="h-10" />
          <div className="text-right text-sm text-white">
            <p className="font-medium">📞 +91 90000 00000</p>
            <p>✉️ info@verifiedwork.com</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 px-6 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* LEFT */}
            <div className="hidden md:flex flex-col justify-center text-white">
              <h1 className="text-4xl font-bold mb-4">
                Welcome Back to VerifiedWork
              </h1>
              <p className="text-lg text-gray-200 mb-6">
                Manage projects, track productivity, and collaborate seamlessly.
              </p>
              <ul className="space-y-3 text-gray-200">
                <li>✔ Real-time work visibility</li>
                <li>✔ Secure dashboards</li>
                <li>✔ Built for teams</li>
              </ul>
            </div>

            {/* RIGHT CARD */}
            <div className="flex justify-center">
              <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

                <h2 className="text-2xl font-bold text-center mb-1">
                  Sign in
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Continue to your workspace
                </p>

                {/* GOOGLE ONLY */}
                <div className="mb-5">
                  <button className="w-full flex items-center justify-center gap-3 border rounded-lg py-2 hover:bg-gray-50 transition">
                    <FcGoogle size={20} />
                    Continue with Google
                  </button>
                </div>

                <div className="flex items-center my-5">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="px-3 text-sm text-gray-500">OR</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <input
                  className="w-full p-3 border rounded-lg mb-3"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  className="w-full p-3 border rounded-lg mb-2"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* FORGOT PASSWORD */}
                <div className="text-right mb-4">
                  <span
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-blue-600 cursor-pointer hover:underline"
                  >
                    Forgot password?
                  </span>
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                >
                  Login
                </button>

                <p className="text-sm text-center mt-4">
                  Don’t have an account?{" "}
                  <span
                    onClick={() => navigate("/signup")}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Sign up
                  </span>
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
