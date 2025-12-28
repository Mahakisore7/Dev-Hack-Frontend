import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Mail, Lock, ShieldAlert } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 🟢 1. Call Backend
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      if (res.data.success) {
        // 🟢 2. Save Token
        localStorage.setItem("token", res.data.token);
        
        // 🟢 3. FIX: Save using "userData" key to match your screenshot and ProtectedRoute
        const user = res.data.userData; 
        localStorage.setItem("userData", JSON.stringify(user));

        // 🟢 4. FIX: Use "citizen" instead of "user" to match your database role
        if (user?.role === "admin") {
          navigate("/admin");
        } else if (user?.role === "citizen") {
          navigate("/user");
        } else {
          // Fallback for any other roles
          navigate("/user");
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
      // Provides more specific error feedback
      const errorMsg = err.response?.data?.message || "Login failed. Please check your credentials.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>

      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-red-500/20 p-4 rounded-full mb-4">
            <ShieldAlert size={40} className="text-red-500" />
          </div>
          <h2 className="text-3xl font-bold text-white">IncidentHub</h2>
          <p className="text-slate-400 mt-2">Emergency Response Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <label className="text-sm font-medium text-slate-300 mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="email"
                placeholder="admin@emergency.com"
                className="w-full bg-slate-900 border border-slate-700 text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-medium text-slate-300 mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;