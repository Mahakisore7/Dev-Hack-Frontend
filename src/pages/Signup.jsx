// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "user", // Default role
//   });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("https://resq-jg07.onrender.com/api/auth/signup", formData);
//       if (res.data.success) {
//         alert("Account created! Please login.");
//         navigate("/");
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full p-2 mb-4 border rounded"
//           onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-4 border rounded"
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 border rounded"
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           required
//         />
//         <select 
//           className="w-full p-2 mb-4 border rounded"
//           onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//         >
//           <option value="user">Citizen (User)</option>
//           <option value="admin">Authority (Admin)</option>
//         </select>
//         <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//           Sign Up
//         </button>
//         <p className="mt-4 text-sm text-center">
//           Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ShieldCheck } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://resq-jg07.onrender.com/api/auth/signup", formData);
      if (res.data.success) {
        alert("Account created successfully!");
        navigate("/"); // Moves to login page
      }
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden border border-white">
        
        {/* Left Side: Visual/Branding */}
        <div className="md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-center items-center text-center">
          <div className="bg-white/20 p-4 rounded-2xl mb-6">
            <ShieldCheck size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold mb-4">Join the Network</h1>
          <p className="text-blue-100 leading-relaxed">
            Create an account to report emergencies, verify community incidents, and stay safe.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
            <p className="text-slate-500 mt-2 font-medium">Get started with your secure account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Account Type</label>
              <select 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="user">Citizen (Reporter)</option>
                <option value="admin">Authority (Responder)</option>
              </select>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? "Creating Account..." : <><UserPlus size={18}/> Sign Up</>}
            </button>

            <div className="pt-6 text-center">
              <p className="text-slate-500 text-sm">
                Already have an account?{" "}
                <Link to="/" className="text-blue-600 font-bold hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;