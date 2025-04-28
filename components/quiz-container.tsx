"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion } from "@/components/quiz-question";
import { ScorePage } from "@/components/score-page";
import { quizQuestions } from "@/data/quiz-data";

export function QuizContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(null);

  // Only select questions when quiz is started with a specific week
  useEffect(() => {
    if (quizStarted && selectedWeek !== null) {
      // Filter questions by week if needed
      const weekQuestions = selectedWeek === 'all' 
        ? quizQuestions 
        : quizQuestions.filter(q => q.week === selectedWeek);
      
      const shuffled = [...weekQuestions].sort(() => 0.5 - Math.random());
      setSelectedQuestions(shuffled.slice(0, 10));
    }
  }, [quizStarted, selectedWeek]);

  const handleAnswer = (selectedOption) => {
    if (answered) return;

    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const correct = selectedOption === currentQuestion.answer;

    setIsCorrect(correct);
    setAnswered(true);

    if (correct) {
      setScore(score + 1);
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < selectedQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setSelectedWeek(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setAnswered(false);
  };

  const startQuiz = (week) => {
    setSelectedWeek(week);
    setQuizStarted(true);
  };

  // Week selection screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-[#e0e5ec] flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 rounded-3xl shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff]"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select a Week</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => (
              <button
                key={week}
                onClick={() => startQuiz(week)}
                className="p-4 rounded-xl bg-white shadow-[4px_4px_8px_#b8b9be,_-4px_-4px_8px_#ffffff] 
                  hover:shadow-[inset_4px_4px_8px_#b8b9be,_inset_-4px_-4px_8px_#ffffff] 
                  transition-all duration-300 text-gray-700 font-medium"
              >
                Week {week}
              </button>
            ))}
          </div>
          <button
            onClick={() => startQuiz('all')}
            className="w-full mt-6 p-4 rounded-xl bg-blue-600 text-white shadow-md 
              hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            All Weeks
          </button>
        </motion.div>
      </div>
    );
  }

  if (showScore) {
    return (
      <ScorePage
        score={score}
        totalQuestions={selectedQuestions.length}
        onRestart={restartQuiz}
      />
    );
  }

  if (selectedQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#e0e5ec]">
        <div className="text-gray-700 text-2xl font-medium p-8 rounded-3xl shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff]">
          Loading questions...
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        answered
          ? isCorrect
            ? "bg-gradient-to-br from-[#e0e5ec] to-[#d4f5e9]"
            : "bg-gradient-to-br from-[#ff9999] to-[#ffcccc]"
          : "bg-[#e0e5ec]"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-700 text-xl font-medium p-4 rounded-2xl shadow-[5px_5px_10px_#b8b9be,_-5px_-5px_10px_#ffffff]">
            Question {currentQuestionIndex + 1}/{selectedQuestions.length}
          </div>
          <div className="text-gray-700 text-xl font-medium p-4 rounded-2xl shadow-[5px_5px_10px_#b8b9be,_-5px_-5px_10px_#ffffff]">
            Score: {score}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <QuizQuestion
              question={selectedQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
              answered={answered}
              isCorrect={isCorrect}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
