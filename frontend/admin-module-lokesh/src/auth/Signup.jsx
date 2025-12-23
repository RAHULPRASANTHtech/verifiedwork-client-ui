import logo from "../assets/app-logos/logo.png";
import bgImage from "../assets/background.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./authService";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  const [form, setForm] = useState({ role: "client" });
  const navigate = useNavigate();

  const handleSignup = () => {
    signup(form);
    navigate("/login");
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
                Join VerifiedWork Today
              </h1>
              <p className="text-lg text-gray-200 mb-6">
                Manage freelancers, track productivity, and pay only
                for actual hours worked.
              </p>
              <ul className="space-y-3 text-gray-200">
                <li>✔ Time tracking with proof</li>
                <li>✔ Transparent freelancer management</li>
                <li>✔ Built for remote teams</li>
              </ul>
            </div>

            {/* RIGHT CARD */}
            <div className="flex justify-center">
              <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

                <h2 className="text-2xl font-bold text-center mb-1">
                  Create Account
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                  Get started in minutes
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
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <input
                  type="password"
                  className="w-full p-3 border rounded-lg mb-3"
                  placeholder="Password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <select
                  className="w-full p-3 border rounded-lg mb-3"
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                >
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>

                <button
                  onClick={handleSignup}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                >
                  Sign Up
                </button>

                <p className="text-sm text-center mt-4">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Login
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
