
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const symbols = `<>{}[]()#//\\<>[]{}()##`;

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen relative bg-gray-900 text-white overflow-hidden font-mono">
      {/* Animated Symbol Background */}
      <motion.div
        className="absolute inset-0 text-green-500 opacity-10 text-6xl whitespace-pre z-0 select-none leading-none"
        initial={{ y: 0 }}
        animate={{ y: -200 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 20 }}
      >
        {Array(30).fill(symbols).join("\n")}
      </motion.div>

      {/* Glass Layer */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-0" />

      {/* Header Logos (All Logos Increased Size) */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:flex-wrap justify-between items-center p-6 md:p-10">
        {/* ABESIT Logo */}
        <div className="flex space-x-6 z-10 mb-4 sm:mb-0">
          {["/aktu.png", "/abesit.jpg"].map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt="Logo"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 * (i + 1), duration: 1 }}
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
          ))}
        </div>

        {/* Other Logos */}
        <div className="flex space-x-6 z-10">
          {["/naaclogo.png", "/studentwelfare.jpeg"].map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt="Logo"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 * (i + 1), duration: 1 }}
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
          ))}
        </div>
      </div>

      {/* Title */}
      <motion.div
        className="relative z-10 mt-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-purple-400 drop-shadow">
          <span className="text-green-400">&lt;</span> CodeWarZone{" "}
          <span className="text-green-400">&gt;</span>
        </h1>
        <p className="text-lg sm:text-xl mt-2 text-gray-300">
          [ C Programming Quiz & Coding Challenge ]
        </p>
      </motion.div>

      {/* Welcome */}
      <motion.div
        className="relative z-10 mt-10 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-300">
          # Welcome to the Ultimate Coding Competition #
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-300">
          // Sharpen your skills in C Programming & test your logic ⚙️ <br />
          // Hit <span className="text-green-300">"GetStarted();"</span> and
          enter the
          <span className="text-purple-400"> Zone</span>
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        className="relative z-10 flex justify-center mt-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={handleGetStarted}
          className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-green-500 to-purple-500 text-white text-xl font-bold rounded-full shadow-lg transition duration-300"
        >
          GetStarted();
        </button>
      </motion.div>

      {/* Quote */}
      <motion.div
        className="relative z-10 text-center mt-12 text-gray-300 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <b>"The only way to do great work is to love what you do."</b> <br />
        <span className=" text-xl text-gray-500">- Steve Jobs</span>
      </motion.div>
    </div>
  );
};

export default HomePage;
