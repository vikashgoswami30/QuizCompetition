import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const Admin = () => {
  const [loginUsers, setLoginUsers] = useState([]);
  const [round1Scores, setRound1Scores] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingScores, setLoadingScores] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [displaySection, setDisplaySection] = useState('users'); // default: show users

  useEffect(() => {
    const fetchLoginUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login-users');
        if (response.ok) {
          const data = await response.json();
          setLoginUsers(data);
        } else {
          setErrorMessage('Failed to fetch users.');
        }
      } catch (error) {
        console.error('Error fetching login users:', error);
        setErrorMessage('Error fetching users.');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchLoginUsers();
  }, []);

  const fetchRound1Scores = async () => {
    setLoadingScores(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/round1-scores');
      if (response.ok) {
        const data = await response.json();
        data.sort((a, b) => b.score - a.score);
        setRound1Scores(data);
      } else {
        setErrorMessage('Failed to fetch round 1 scores.');
      }
    } catch (error) {
      console.error('Error fetching round 1 scores:', error);
      setErrorMessage('Error fetching round 1 scores.');
    } finally {
      setLoadingScores(false);
    }
  };

  const deleteLoginUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/login-users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setLoginUsers(prev => prev.filter(user => user._id !== id));
        alert('User deleted successfully');
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      alert('Error deleting user',error);
    }
  };

  const deleteRound1Score = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/round1-scores/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRound1Scores(prev => prev.filter(score => score._id !== id));
        alert('Score deleted successfully');
      } else {
        alert('Failed to delete score');
      }
    } catch (error) {
      alert('Error deleting score',error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 mb-8">
          <button
            onClick={() => setDisplaySection('users')}
            className={`px-6 py-2 rounded-full bg-white text-indigo-700 font-semibold shadow-lg transition hover:scale-105 ${
              displaySection === 'users' ? 'ring-2 ring-white' : ''
            }`}
          >
            Show Login Users
          </button>
          <button
            onClick={() => {
              setDisplaySection('scores');
              fetchRound1Scores();
            }}
            className={`px-6 py-2 rounded-full bg-white text-green-700 font-semibold shadow-lg transition hover:scale-105 ${
              displaySection === 'scores' ? 'ring-2 ring-white' : ''
            }`}
          >
            Show Round 1 Scores
          </button>
        </div>

        {errorMessage && (
          <div className="bg-red-200 text-red-800 p-3 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        {/* Users Section */}
        {displaySection === 'users' && (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">👥 Login Users</h2>
            {loadingUsers ? (
              <p className="text-center text-black/80"><Loader/></p>
            ) : loginUsers.length > 0 ? (
              <div className="grid gap-4">
                {loginUsers.map(user => (
                  <div
                    key={user._id}
                    className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center"
                  >
                    <div>
                      <p className="font-semibold text-black text-lg">{user.teamName}</p>
                      <p className="text-sm text-black/80">{user.email}</p>
                    </div>
                    <button
                      onClick={() => deleteLoginUser(user._id)}
                      className="mt-2 sm:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-white/80">No users found</p>
            )}
          </>
        )}

        {/* Scores Section */}
        {displaySection === 'scores' && (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">🏆 Round 1 Scores</h2>
            {loadingScores ? (
              <p className="text-center text-white/80"><Loader/></p>
            ) : round1Scores.length > 0 ? (
              <div className="grid gap-4">
                {round1Scores.map(score => (
                  <div
                    key={score._id}
                    className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center"
                  >
                    <div>
                      <p className="font-semibold text-black text-lg">{score.teamName}</p>
                      <p className="text-sm text-black/80">{score.email}</p>
                      <p className="text-sm text-black">Score: {score.score}</p>
                    </div>
                    <button
                      onClick={() => deleteRound1Score(score._id)}
                      className="mt-2 sm:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-white/80">No scores found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;

