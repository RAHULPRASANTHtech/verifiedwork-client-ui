import logo from "../assets/app-logos/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./authService";

export default function Signup() {
  const [form, setForm] = useState({ role: "client" });
  const navigate = useNavigate();

  const handleSignup = () => {
    signup(form);
    navigate("/login");
  };

  return (
    <>
      {/* FIXED HEADER */}
      <div className="w-full
                bg-gray-100 dark:bg-[#0B1220]">

        <div className="flex items-start justify-between px-4 py-4">

          {/* LEFT EXTREME: LOGO */}
          <img
            src={logo}
            alt="VerifiedWork"
            className="h-20 object-contain"
          />

          {/* RIGHT EXTREME: CONTACT INFO */}
          <div className="text-right text-base text-gray-700 dark:text-gray-300">
            <p className="font-medium flex items-center justify-end gap-2">
              📞 +91 90000 00000
            </p>
            <p className="flex items-center justify-end gap-2">
              ✉️ info@verifiedwork.com
            </p>
          </div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="min-h-screen bg-gray-100 dark:bg-[#0B1220]
                      px-4 py-10 pt-52">

        {/* SIGNUP CARD */}
        <div className="max-w-md mx-auto bg-white dark:bg-[#111A2E]
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

          {/* FORM */}
          <h2 className="text-lg font-semibold mb-4 
                         text-gray-700 dark:text-gray-200">
            Create Account
          </h2>

          <input
            className="w-full p-3 rounded-lg border 
                       bg-gray-50 dark:bg-[#1E293B]
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="w-full p-3 rounded-lg border mt-3
                       bg-gray-50 dark:bg-[#1E293B]
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            className="w-full p-3 rounded-lg border mt-3
                       bg-gray-50 dark:bg-[#1E293B]
                       text-gray-900 dark:text-white
                       border-gray-300 dark:border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleSignup}
            className="w-full mt-6 py-3 rounded-lg
                       bg-blue-600 hover:bg-blue-700
                       text-white font-medium transition"
          >
            Sign Up
          </button>

          {/* FOOTER */}
          <div className="text-center mt-4 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              Already have an account?
            </span>{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
            >
              Login
            </span>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-12
                         text-gray-800 dark:text-white">
            Features & Benefits
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Feature
              title="Track Time with Proof"
              desc="Automatically track work hours and activity with visual proof."
            />
            <Feature
              title="See Work in Real Time"
              desc="Monitor progress instantly without waiting for reports."
            />
            <Feature
              title="Accurate Payments"
              desc="Pay only for actual hours worked with confidence."
            />
            <Feature
              title="Stay Productive"
              desc="Clear visibility helps teams stay focused and efficient."
            />
            <Feature
              title="Team Friendly"
              desc="Works smoothly with project management workflows."
            />
            <Feature
              title="Built for Remote Work"
              desc="Designed specifically for freelancers and remote teams."
            />
          </div>
        </div>
      </div>
    </>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-white dark:bg-[#111A2E]
                    p-6 rounded-lg shadow
                    text-center">
      <h3 className="font-semibold text-lg mb-2
                     text-gray-800 dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {desc}
      </p>
    </div>
  );
}
