import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    try {
      const response = await fetch(
        "https://quizcompetition.onrender.com/api/auth/login", // http://localhost:5000/api/auth/signup

        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();
      console.log("Login Response:", data);

      if (response.ok) {
        toast.success("Login Successful 🎉");
        const previousEmail = localStorage.getItem("email");
        const previousTeamName = localStorage.getItem("teamName");

        const isDifferentUser =
          previousEmail !== formData.email ||
          previousTeamName !== data.teamName;
        if (isDifferentUser) {
          localStorage.setItem("round1Submitted", "false");
        }

        localStorage.setItem("teamName", data.teamName);
        localStorage.setItem("email", formData.email);
        localStorage.setItem(
          "user",
          JSON.stringify({
            teamName: data.teamName,
            email: formData.email,
          })
        );

        const scoreCheck = await fetch(
          `https://quizcompetition.onrender.com/api/auth/score/check/${formData.email}`
        );
        const scoreData = await scoreCheck.json();
        console.log("Score Check Response:", scoreData);

        localStorage.setItem(
          "round1Submitted",
          scoreData.exists ? "true" : "false"
        );

        setTimeout(() => {
          setLoading(false); // Stop loader before navigating
          navigate("/dashboard");
        }, 1000);
      } else {
        setLoading(false); // Stop loader
        toast.error(data.message || "Login Failed ❌");
      }
    } catch (error) {
      setLoading(false); // Stop loader
      console.error(error);
      toast.error("Something went wrong ❌");
    }
  };




return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-6">
    
    <Link to="/" className="mb-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-purple-400 drop-shadow text-center">
        <span className="text-green-400">&lt;</span> CodeWarZone{" "}
        <span className="text-green-400">&gt;</span>
      </h1>
    </Link>

    <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-purple-500/30 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-purple-600/40">
      <h2 className="text-3xl font-extrabold text-center text-white mb-8 tracking-wider">
        🚀 Welcome Back
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
              placeholder="Enter your team name"
              className="bg-transparent outline-none w-full text-white placeholder-purple-300"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-1">
            Email Address
          </label>
          <div className="flex items-center bg-white/10 border border-purple-400/40 rounded-xl px-4 py-2">
            <FaEnvelope className="text-purple-300 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
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
              placeholder="Enter your password"
              className="bg-transparent outline-none w-full text-white placeholder-purple-300"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login 🔥"}
        </button>
      </form>

      {/* Not registered yet */}
      <p className="text-center text-purple-300 mt-6 text-sm">
        Not registered yet?
        <Link
          to="/signup"
          className="ml-1 underline font-semibold text-pink-400 hover:text-pink-500"
        >
          Sign up here
        </Link>
      </p>
    </div>

    <ToastContainer theme="dark" />
  </div>
);



};

export default LoginPage;
