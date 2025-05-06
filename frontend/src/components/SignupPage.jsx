
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaEnvelope, FaLock, FaUsers } from "react-icons/fa";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teamName: "",
    firstMember: "",
    secondMember: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // 👈 loader state

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Signup Successful! 🎉", { position: "top-center" });
        setTimeout(() => {
          setLoading(false); // stop loader
          navigate("/login");
        }, 2000);
      } else {
        setLoading(false); // stop loader
        toast.error(data.message || "Signup Failed 🚫", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setLoading(false); // stop loader
      toast.error("Something went wrong! 😢", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center p-4">
      <div className="w-full max-w-lg backdrop-blur-xl bg-white/5 border border-purple-500/30 shadow-xl rounded-2xl p-10 transition-all duration-300 hover:shadow-purple-600/40">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wider">
          🚀 Create Your Team
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Name */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Team Name
            </label>
            <div className="flex items-center bg-white/10 border border-purple-400/40 rounded-xl px-4 py-2">
              <FaUsers className="text-purple-300 mr-2" />
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="Eg: Code Avengers"
                className="bg-transparent outline-none w-full text-white placeholder-purple-300"
                required
              />
            </div>
          </div>

          {/* First Member */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              First Member
            </label>
            <div className="flex items-center bg-white/10 border border-purple-400/40 rounded-xl px-4 py-2">
              <FaUser className="text-purple-300 mr-2" />
              <input
                type="text"
                name="firstMember"
                value={formData.firstMember}
                onChange={handleChange}
                placeholder="Eg: First member"
                className="bg-transparent outline-none w-full text-white placeholder-purple-300"
                required
              />
            </div>
          </div>

          {/* Second Member */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Second Member
            </label>
            <div className="flex items-center bg-white/10 border border-purple-400/40 rounded-xl px-4 py-2">
              <FaUser className="text-purple-300 mr-2" />
              <input
                type="text"
                name="secondMember"
                value={formData.secondMember}
                onChange={handleChange}
                placeholder="Eg: Second member"
                className="bg-transparent outline-none w-full text-white placeholder-purple-300"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Email
            </label>
            <div className="flex items-center bg-white/10 border border-purple-400/40 rounded-xl px-4 py-2">
              <FaEnvelope className="text-purple-300 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Eg: team@email.com"
                className="bg-transparent outline-none w-full text-white placeholder-purple-300"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">
              Password
            </label>
            <div className="flex items-center bg-white/10 border border-purple-400/40 rounded-xl px-4 py-2">
              <FaLock className="text-purple-300 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a strong password"
                className="bg-transparent outline-none w-full text-white placeholder-purple-300"
                required
              />
            </div>
          </div>

          {/* Submit */}
          {/* <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300"
          >
            Create Team 🔥
          </button> */}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Create Team 🔥"
            )}
          </button>
        </form>

        {/* Already have an account? */}
        <p className="text-center text-purple-300 mt-6 text-sm">
          Already registered?
          <Link
            to="/login"
            className="ml-1 underline font-semibold text-pink-400 hover:text-pink-500"
          >
            Login here
          </Link>
        </p>
      </div>

      <ToastContainer theme="dark" />
    </div>
  );
};

export default SignupPage;
