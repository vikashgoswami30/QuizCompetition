import React, { useState, useEffect } from "react";
import { FaUserCircle, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();  // Assuming you have this from AuthContext

  const teamName = localStorage.getItem("teamName") || "User";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [round1Submitted, setRound1Submitted] = useState(false);
  const [password, setPassword] = useState("");
  const [isEligibleForRound2, setIsEligibleForRound2] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const openAdminModal = () => setIsAdminModalOpen(true);
  const closeAdminModal = () => {
    setIsAdminModalOpen(false);
    setAdminPassword("");
  };
  const handleAdminAccess = () => {
    if (adminPassword === "@admin1234") {
      navigate("/admin");
      closeAdminModal();
    } else {
      alert("You are not able to access admin side.");
    }
  };

  useEffect(() => {
    const submitted = localStorage.getItem("round1Submitted");
    if (submitted === "true") setRound1Submitted(true);

    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "https://quizcompetition.onrender.com/api/auth/leaderboard"
        );
        const leaderboardData = response.data.sort((a, b) => b.score - a.score);
        const top10 = leaderboardData.slice(0, 10);
        setIsEligibleForRound2(
          top10.some((team) => team.teamName === teamName)
        );
      } catch (err) {
        console.error("Failed to fetch leaderboard data:", err);
      }
    };
    fetchLeaderboard();
  }, [teamName]);

  const openModal = (content) => {
    const email = localStorage.getItem("email");

    

    if (content.includes("Round 1") && round1Submitted) {
      return alert(
        email ? "You have already submitted Round 1." : "Email not found!"
      );
    }

    if (content.includes("Round 2") && !isEligibleForRound2) {
      return alert("You are not eligible for Round 2.");
    }


    setModalContent(content);
    setIsModalOpen(true);
    setIsAgreed(false);
    setPassword("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
    setIsAgreed(false);
  };

  const handleOk = () => {
    if (modalContent.includes("Round 1")) {
      navigate("/round1");
    } else if (
      modalContent.includes("Leaderboard") &&
      password === "30102209"
    ) {
      navigate("/leader");
    } else if (
      modalContent.includes("Round 2") &&
      isEligibleForRound2 &&
      password === "30220910"
    ) {
      navigate("/round2");
    } else if (modalContent.includes("Round 3") && password === "12344321") {
      navigate("/round3");
    } else {
      alert("Incorrect or Unauthorized Access");
      return;
    }
    closeModal();
  };



  const handleLogout = () => setIsLogoutModalOpen(true);

const handleLogoutConfirm = () => {
  // Remove user data from localStorage or sessionStorage
  localStorage.removeItem('user'); // or sessionStorage.removeItem('user');

  // Reset the user state (if using context or state management for auth)
  setUser(null); // Update the user state (this could be from context)

  // Show toast for successful logout
  toast.success("Logout Successful!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
  });

  // Navigate to login page
  navigate("/login");

  // Close the logout modal
  setIsLogoutModalOpen(false);
};

const handleLogoutCancel = () => setIsLogoutModalOpen(false);


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-4 sm:p-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-purple-700 text-center sm:text-left">
          Dashboard
        </h1>
        <button
          onClick={openAdminModal}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition-transform duration-300"
        >
          Admin
        </button>

        <div className="flex items-center space-x-3">
          <span className="text-gray-700 font-semibold text-lg">
            Welcome, {teamName}!
          </span>
          <FaUserCircle className="text-3xl text-purple-700" />
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {[
          {
            title: "Round 1",
            desc: "This is the first round where the top 10 teams will be selected.",
            color: "from-purple-500 to-pink-500",
            text: "text-purple-600",
            onClick: () =>
              openModal(
                "Instructions for Round 1:\n- Complete the quiz.\n- Top 10 teams will be selected.\n- Time limit: 30 minutes."
              ),
          },
          {
            title: "Round 2",
            desc: "In this round, the top 5 teams will be selected for the final round.",
            color: "from-pink-500 to-yellow-400",
            text: "text-pink-600",
            onClick: () =>
              openModal(
                "Instructions for Round 2:\n- Solve problem statements.\n- Top 5 teams will be selected.\n- Time limit: 45 minutes."
              ),
          },
          {
            title: "Round 3",
            desc: "This is an offline rapid-fire round for final selected teams.",
            color: "from-yellow-400 to-green-400",
            text: "text-yellow-600",
            onClick: () =>
              openModal(
                "Instructions for Round 3:\n- Rapid fire offline round.\n- Be quick and accurate.\n- Shortest correct answers win!"
              ),
          },
          {
            title: "Leaderboard",
            desc: "Check the progress and ranking of all teams.",
            color: "from-green-400 to-blue-400",
            text: "text-green-600",
            onClick: () =>
              openModal(
                "Instructions for Leaderboard:\n- View the latest rankings.\n- Keep track of your performance!"
              ),
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center justify-between hover:shadow-2xl transition-all duration-300"
          >
            <h2 className={`text-2xl font-bold mb-4 ${card.text}`}>
              {card.title}
            </h2>
            <p className="text-gray-600 text-center mb-6">{card.desc}</p>
            <button
              onClick={card.onClick}
              className={`bg-gradient-to-r ${card.color} text-white py-2 px-6 rounded-full font-semibold hover:scale-105 transition-transform duration-300`}
            >
              {card.title === "Leaderboard" ? "See Progress" : "Start"}
            </button>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed bottom-5 right-5 bg-red-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-red-700 flex items-center space-x-2"
      >
        <FaSignOutAlt size={20} />
        <span className="hidden sm:inline font-medium">Logout</span>
      </button>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-6 w-11/12 max-w-md relative">
            <button
              onClick={handleLogout}
              className="fixed bottom-5 right-5 bg-red-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-red-700 flex items-center space-x-2"
            >
              <FaSignOutAlt size={20} />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-around">
              <button
                onClick={handleLogoutConfirm}
                className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={handleLogoutCancel}
                className="bg-gray-400 text-white py-2 px-6 rounded-full hover:bg-gray-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-6 w-11/12 max-w-md relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              Instructions
            </h2>
            <p className="text-gray-700 whitespace-pre-line mb-6">
              {modalContent}
            </p>

            {(modalContent.includes("Leaderboard") ||
              modalContent.includes("Round 2") ||
              modalContent.includes("Round 3")) && (
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
              />
            )}

            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="agree"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
                className="accent-purple-600 w-5 h-5"
              />
              <label htmlFor="agree" className="text-gray-700">
                I agree to the instructions
              </label>
            </div>

            {isAgreed && (
              <button
                onClick={handleOk}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 w-full rounded-full font-semibold hover:scale-105 transition-transform duration-300"
              >
                OK
              </button>
            )}
          </div>
        </div>
      )}

      {isAdminModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-6 w-11/12 max-w-md relative">
            <button
              onClick={closeAdminModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
              Admin Access
            </h2>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full p-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <button
              onClick={handleAdminAccess}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 w-full rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
