import React, { useState } from "react";
import { WeeklyQuiz, QuizQuestion } from "../data/quiz-data";

interface QuizProps {
  quiz: WeeklyQuiz;
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ quiz, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowAnswer(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed!</h2>
        <p>
          Your score: {score} out of {quiz.questions.length}
        </p>
        <button onClick={onBack}>Back to Week Selection</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>
        {quiz.title} - Week {quiz.week}
      </h2>
      <p>
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </p>

      <div className="question">
        <h3>{currentQuestion.question}</h3>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`option ${
                selectedOption === option ? "selected" : ""
              } ${
                showAnswer && option === currentQuestion.answer ? "correct" : ""
              } ${
                showAnswer &&
                selectedOption === option &&
                option !== currentQuestion.answer
                  ? "incorrect"
                  : ""
              }`}
              onClick={() => !showAnswer && handleOptionSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="controls">
        {!showAnswer ? (
          <button onClick={handleCheckAnswer} disabled={!selectedOption}>
            Check Answer
          </button>
        ) : (
          <button onClick={handleNextQuestion}>
            {currentQuestionIndex < quiz.questions.length - 1
              ? "Next Question"
              : "Finish Quiz"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
