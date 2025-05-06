import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';

const Progress = () => {
  const [teamsRound1, setTeamsRound1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('https://quizcompetition.onrender.com/api/auth/leaderboard');
        const leaderboardData = response.data;

        leaderboardData.sort((a, b) => b.score - a.score);
        setTeamsRound1(leaderboardData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leaderboard data.',err);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Leaderboard</h1>
        <div className="text-center text-lg text-purple-700"><Loader/></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Leaderboard</h1>
        <div className="text-center text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Leaderboard - Round 1</h1>

      {/* Round 1 button shown as active (disabled visually) */}
      <div className="flex justify-center mb-6 gap-4">
        <button
          className="px-4 py-2 rounded-full font-semibold bg-purple-700 text-white cursor-not-allowed"
        >
          Round 1
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-3xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-700">Team Name</span>
          <span className="text-lg font-semibold text-gray-700">Score</span>
        </div>

        {/* Display teams */}
        <div>
          {teamsRound1.map((team, index) => {
            const bgColor = index < 10 ? 'bg-green-200' : 'bg-red-200';
            return (
              <div
                key={index}
                className={`flex justify-between items-center py-3 px-4 my-2 rounded-md ${bgColor}`}
              >
                <span className="text-lg font-semibold text-purple-700">{team.teamName || team.name}</span>
                <span className="text-lg font-semibold text-purple-700">{team.score}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Progress