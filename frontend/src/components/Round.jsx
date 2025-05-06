import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // ✅ Axios import kar lo request ke liye

const questionsData = [
  {
    id: "q1", // Unique ID for the question
    questionImage: "/img1.png", // Question Image URL
    options: ["2,7", "7,2", "5,2", "2,5"],
    correctAnswer: "7,2",
  },
  {
    id: "q2", // Unique ID for the question
    questionImage: "img2.png", // Question Image URL
    options: ["12,4", "4,12", "4", "2"],
    correctAnswer: "12,4",
  },
  {
    id: "q3", // Unique ID for the question
    questionImage: "img3.png", // Question Image URL
    options: ["Logical Error", "300", "200", "Compilation Error"],
    correctAnswer: "200",
  },
  {
    id: "q4", // Unique ID for the question
    questionImage: "img4.png", // Question Image URL
    options: ["No Output", "10,20", "1", "Error"],
    correctAnswer: "10,20",
  },
  {
    id: "q5", // Unique ID for the question
    questionImage: "img5.png", // Question Image URL
    options: ["C is WOW", "C is Headache", "0", "Error"],
    correctAnswer: "C is WOW",
  },
  {
    id: "q6", // Unique ID for the question
    questionImage: "img6.png", // Question Image URL
    options: ["Error", "0 15 15", "15 15 15", "15 15 0"],
    correctAnswer: "15 15 0",
  },
  {
    id: "q7", // Unique ID for the question
    questionImage: "img7.png", // Question Image URL
    options: [
      "Counting 1 to 10",
      "Counting 0 to 9",
      "Counting 1 to 9",
      "Error",
    ],
    correctAnswer: "Counting 1 to 10",
  },
  {
    id: "q8", // Unique ID for the question
    questionImage: "img8.png", // Question Image URL
    options: ["11", "12", "10", "Error"],
    correctAnswer: "10",
  },
  {
    id: "q9", // Unique ID for the question
    questionImage: "img9.png", // Question Image URL
    options: ["20", "18", "21", "Error"],
    correctAnswer: "21",
  },
  {
    id: "q10", // Unique ID for the question
    questionImage: "img10.png", // Question Image URL
    options: ["Size in Bits", "Size in Bytes", "4 Bytes", "2 Bytes"],
    correctAnswer: "Size in Bytes",
  },
  {
    id: "q11", // Unique ID for the question
    questionImage: "img11.png", // Question Image URL
    options: [
      "Counting 1 to 10",
      "Undefined",
      "Compilation Error",
      "Infinit Loop",
    ],
    correctAnswer: "Counting 1 to 10",
  },
  {
    id: "q12", // Unique ID for the question
    questionImage: "img12.png", // Question Image URL
    options: ["HelloHi", "Error", "Undefined", "Scope Out of Bound"],
    correctAnswer: "HelloHi",
  },
  {
    id: "q13", // Unique ID for the question
    questionImage: "img13.png", // Question Image URL
    options: ["24", "24.2", "Syntax Error", "Logical Error"],
    correctAnswer: "24",
  },
  {
    id: "q14", // Unique ID for the question
    questionImage: "img14.png", // Question Image URL
    options: ["Error", "24", "24.2", "0"],
    correctAnswer: "Error",
  },
  {
    id: "q15", // Unique ID for the question
    questionImage: "img15.png", // Question Image URL
    options: ["Error", "1,2,3", "1", "123"],
    correctAnswer: "Error",
  },
  {
    id: "q16", // Unique ID for the question
    questionImage: "img16.png", // Question Image URL
    options: ["1,2,3", "3", "Undefined", "Error"],
    correctAnswer: "3",
  },
  {
    id: "q17", // Unique ID for the question
    questionImage: "img17.png", // Question Image URL
    options: ["TRUE", "Error", "FALSE", "0"],
    correctAnswer: "FALSE",
  },
  {
    id: "q18", // Unique ID for the question
    questionImage: "img18.png", // Question Image URL
    options: ["3 2", "3 4", "4 3", "3 3"],
    correctAnswer: "3 3",
  },
  {
    id: "q19", // Unique ID for the question
    questionImage: "img19.png", // Question Image URL
    options: [
      "0 Extra Variable",
      "1 Extra Variable",
      "2 Extra Variable",
      "3 Extra Variable",
    ],
    correctAnswer: "0 Extra Variable",
  },
  {
    id: "q20", // Unique ID for the question
    questionImage: "img20.png", // Question Image URL
    options: [
      "Some Random Value",
      "Compilation Error",
      "Address to the main function",
      "Cannot call main more than once",
    ],
    correctAnswer: "Address to the main function",
  },
  {
    id: "q21", // Unique ID for the question
    questionImage: "img21.png", // Question Image URL
    options: ["Undefined", "20", "10", "14"],
    correctAnswer: "14",
  },
  {
    id: "q22", // Unique ID for the question
    questionImage: "img22.png", // Question Image URL
    options: ["2 Bytes", "4 Bytes", "1 Bytes", "Depending on the system"],
    correctAnswer: "Depending on the system",
  },
  {
    id: "q23", // Unique ID for the question
    questionImage: "img23.png", // Question Image URL
    options: [
      "Error",
      "Some ASCII values",
      "Character given by user",
      "Syntax Error",
    ],
    correctAnswer: "Character given by user",
  },
  {
    id: "q24", // Unique ID for the question
    questionImage: "img24.png", // Question Image URL
    options: ["16 21", "21 16", "5", "16"],
    correctAnswer: "16 21",
  },
  {
    id: "q25", // Unique ID for the question
    questionImage: "img25.png", // Question Image URL
    options: ["110", "60", "0", "50"],
    correctAnswer: "0",
  },
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const Round = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timer, setTimer] = useState(30 * 60);
  const [score, setScore] = useState(0);
  const [email, setEmail] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [teamName, setTeamName] = useState("");


useEffect(() => {
  const preloadImages = async () => {
    const imagePromises = questionsData.map((question) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = question.questionImage.startsWith("/")
          ? question.questionImage
          : `/${question.questionImage}`;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    try {
      await Promise.all(imagePromises);
      setQuestions(shuffleArray([...questionsData]));
    } catch (error) {
      console.error("Image loading failed:", error);
    }
  };

  const initializeUser = async () => {
    const storedTeamName = localStorage.getItem("teamName");
    const storedEmail = localStorage.getItem("email");

    if (storedTeamName && storedEmail) {
      setTeamName(storedTeamName);
      setEmail(storedEmail);

      try {
        const res = await axios.post(
          "https://quizcompetition.onrender.com/api/auth/check-submission",
          { email: storedEmail }
        );
        if (res.data.alreadySubmitted) {
          toast.warn("You have already submitted Round 1!");
          localStorage.setItem("round1Submitted", "true");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        }
      } catch (err) {
        console.error("Error checking submission:", err);
      }
    } else {
      const name = prompt("Enter your Team Name:");
      const mail = prompt("Enter your Email:");
      if (name && mail) {
        localStorage.setItem("teamName", name);
        localStorage.setItem("email", mail);
        setTeamName(name);
        setEmail(mail);
      }
    }
  };

  preloadImages();
  initializeUser();
}, []);

 

 

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      handleSubmit();
    }
  }, [timer]);

  const handleOptionSelect = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].id]: option,
    }));
  };

  const calculateScore = () => {
    let tempScore = 0;
    questions.forEach((question) => {
      if (selectedOptions[question.id] === question.correctAnswer) {
        tempScore++;
      }
    });
    return tempScore;
  };

  const handleSubmit = async () => {
    const finalScore = calculateScore();
    setScore(finalScore);

    try {
      await axios.post("https://quizcompetition.onrender.com/api/auth/submit", {
        teamName,
        email,
        score: finalScore,
      });
      toast.success("Submit Successfully!");

      // localstorage me true
      localStorage.setItem("round1Submitted", "true");
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error("Failed to submit!");
    }

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleModalSubmit = () => {
    if (isChecked) {
      handleSubmit();
      setShowModal(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const getQuestionBlockClass = (index) => {
    if (selectedOptions[questions[index].id]) {
      return "bg-green-500 text-white"; // Answered question is green
    }
    return index === currentQuestionIndex
      ? "bg-purple-500 text-white"
      : "bg-red-500 text-white"; // Unanswered question is red
  };

  if (questions.length === 0) return null;

  return (
   


    <div className="min-h-screen bg-[#0f172a] p-4 sm:p-6 relative text-white">
  {/* Timer */}
  <div className="absolute top-4 right-4 sm:right-6 bg-[#1e293b] shadow-md rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base font-bold text-pink-500">
    {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
  </div>

  {/* Heading */}
  <h1 className="text-2xl sm:text-4xl font-bold text-center text-white mb-6 sm:mb-10">
    C Programming Quiz Competition
  </h1>

  {/* Question Blocks */}
  <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-4 justify-center mb-6">
    {questions.map((_, index) => (
      <button
        key={index}
        onClick={() => handleQuestionClick(index)}
        className={`text-sm px-3 py-2 rounded-full font-semibold ${getQuestionBlockClass(index)}`}
      >
        {index + 1}
      </button>
    ))}
  </div>

  {/* Main Card */}
  <div className="max-w-3xl mx-auto bg-[#1e293b] p-4 sm:p-8 rounded-2xl shadow-xl">
    <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
      Question {currentQuestionIndex + 1}
    </h2>

    {/* Question Image */}
    {/* <div className="w-full max-h-[300px] sm:max-h-[400px] overflow-hidden rounded-lg mb-4 sm:mb-6">
      <img
        src={questions[currentQuestionIndex].questionImage}
        alt="Question"
        className="w-full h-full object-contain bg-white rounded"
      />
    </div> */}

<div className="w-full overflow-x-auto rounded-lg mb-4 sm:mb-6 bg-white p-2">
  <img
    src={
      questions[currentQuestionIndex]?.questionImage?.startsWith("/")
        ? questions[currentQuestionIndex].questionImage
        : `/${questions[currentQuestionIndex]?.questionImage}`
    }
    alt="Question"
    className="w-full h-auto object-contain rounded"
  />
</div>



    {/* Options */}
    <div className="flex flex-col gap-3 mb-6 sm:mb-8">
      {questions[currentQuestionIndex].options.map((option, index) => {
        const isSelected =
          selectedOptions[questions[currentQuestionIndex].id] === option;
        return (
          <label
            key={index}
            className={`flex items-center gap-3 text-sm sm:text-base p-2 rounded-lg border ${
              isSelected
                ? "bg-green-600 border-green-400 text-white"
                : "bg-[#334155] border-[#475569] text-white"
            }`}
          >
            <input
              type="radio"
              name={`question-${questions[currentQuestionIndex].id}`}
              value={option}
              checked={isSelected}
              onChange={() => handleOptionSelect(option)}
              className="form-radio text-pink-500"
            />
            <span>{option}</span>
          </label>
        );
      })}
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between gap-4 mt-4">
      <button
        onClick={handlePrevQuestion}
        disabled={currentQuestionIndex === 0}
        className="w-1/2 sm:w-1/4 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-bold disabled:opacity-50"
      >
        Prev
      </button>
      <button
        onClick={handleNextQuestion}
        disabled={currentQuestionIndex === questions.length - 1}
        className="w-1/2 sm:w-1/4 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-bold disabled:opacity-50"
      >
        Next
      </button>
    </div>

    {/* Submit Button */}
    {currentQuestionIndex === questions.length - 1 && (
      <button
        onClick={() => setShowModal(true)}
        disabled={!selectedOptions[questions[currentQuestionIndex].id]}
        className="w-full mt-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-full font-bold disabled:opacity-50"
      >
        Submit
      </button>
    )}
  </div>

  {/* Modal */}
  {showModal && (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50 px-4">
      <div className="bg-[#1e293b] text-white p-6 rounded-lg w-full max-w-xs sm:max-w-md shadow-lg">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">
          Are you sure you want to submit?
        </h3>
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="form-checkbox text-pink-500"
          />
          <span className="text-sm">I confirm to submit.</span>
        </label>
        <div className="flex justify-between">
          <button
            onClick={handleModalClose}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleModalSubmit}
            disabled={!isChecked}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )}

  <ToastContainer />
</div>


  );
};

export default Round;