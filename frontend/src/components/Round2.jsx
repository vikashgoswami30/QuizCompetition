import React, { useState } from "react";

const Round2 = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleStartClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    window.open("https://www.hackerrank.com/round-2-coding-competition", "_blank");
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full mx-auto bg-gray-900 text-white rounded-xl shadow-lg p-8 relative">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Round 2 Coding Test Overview
        </h1>
        <p className="text-xl text-center mb-4">
        "Choose any 3 out of 5 carefully selected questions to enhance your coding skills!"
        </p>

        <div className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3">Test Instructions</h2>
            <p className="text-sm">
            In this test series, you will be presented with 5 coding questions. You are required to solve any 3 of your choice.
            Each question carries 10 points, and the top 5 teams with the highest total scores will be shortlisted for the final round of the competition.
            </p>
            <p className="text-sm">
              Please read each question carefully, and try to write clean,
              efficient code.
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {[
              "Simple Array Sum",
              "Staircase",
              "Solve me first",
              "Plus minus",
              "Birthday Cake Candles",
            ].map((title, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700"
              >
                <h3 className="text-xl font-semibold">
                  Question {index + 1}: {title}
                </h3>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleStartClick}
              className="laser-border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 px-6 py-3 text-white font-bold transition-transform duration-300 hover:scale-105">
                Start the Test
              </span>
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-indigo-500 text-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
              <h2 className="text-xl font-semibold mb-4">Are you sure you want to start the test?</h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirm}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg"
                >
                  ✅ OK
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Round2;
