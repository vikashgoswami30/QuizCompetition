import React, { useState } from "react";

const Round3 = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleStartClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    // Navigate to the actual Round 3 quiz route or external link
    window.open("https://www.your-round-3-link.com", "_blank");
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full mx-auto bg-gray-900 text-white rounded-xl shadow-lg p-8 relative">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Round 3: Rapid Fire Instructions
        </h1>

        <div className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3">Test Instructions</h2>
            <ul className="list-disc list-inside text-sm space-y-2">
              <li>Each correct answer awards you <strong>+10 marks</strong>.</li>
              <li>Each incorrect answer results in a <strong>-5 mark</strong> penalty.</li>
              <li>Passing a question gives <strong>0 marks</strong>.</li>
              <li>This round is fast-paced — make decisions quickly!</li>
            </ul>
          </div>

          {/* Start Button */}
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

export default Round3;
