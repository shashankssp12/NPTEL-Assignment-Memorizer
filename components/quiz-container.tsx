"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QuizQuestion } from "@/components/quiz-question"
import { ScorePage } from "@/components/score-page"
import { quizData } from "@/data/quiz-data"

export function QuizContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Select 10 random questions on component mount
  useEffect(() => {
    const shuffled = [...quizData].sort(() => 0.5 - Math.random())
    setSelectedQuestions(shuffled.slice(0, 10))
  }, [])

  const handleAnswer = (selectedOption) => {
    if (answered) return

    const currentQuestion = selectedQuestions[currentQuestionIndex]
    const correct = selectedOption === currentQuestion.answer

    setIsCorrect(correct)
    setAnswered(true)

    if (correct) {
      setScore(score + 1)
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < selectedQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setAnswered(false)
      } else {
        setShowScore(true)
      }
    }, 1500)
  }

  const restartQuiz = () => {
    const shuffled = [...quizData].sort(() => 0.5 - Math.random())
    setSelectedQuestions(shuffled.slice(0, 10))
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowScore(false)
    setAnswered(false)
  }

  if (showScore) {
    return <ScorePage score={score} totalQuestions={selectedQuestions.length} onRestart={restartQuiz} />
  }

  if (selectedQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#e0e5ec]">
        <div className="text-gray-700 text-2xl font-medium p-8 rounded-3xl shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff]">
          Loading questions...
        </div>
      </div>
    )
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
  )
}
