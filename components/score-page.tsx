"use client"

import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { useEffect, useRef } from "react"
import { NeuButton } from "@/components/neu-button"

export function ScorePage({ score, totalQuestions, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const celebrationRef = useRef(null)

  useEffect(() => {
    // Trigger confetti if score is good
    if (percentage >= 70) {
      const duration = 5 * 1000
      const animationEnd = Date.now() + duration

      const randomInRange = (min, max) => Math.random() * (max - min) + min

      // More intense confetti
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 100 * (timeLeft / duration)

        // Multiple confetti bursts from different positions
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 0,
          particleCount: particleCount * 0.5,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
        })

        confetti({
          startVelocity: 45,
          spread: 360,
          ticks: 60,
          zIndex: 0,
          particleCount: particleCount * 0.5,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
        })
      }, 250)

      // Add some special confetti effects
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          angle: 120,
          startVelocity: 60,
        })
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          angle: 60,
          startVelocity: 60,
        })
      }, 1000)
    }
  }, [percentage])

  return (
    <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl p-10 max-w-md w-full mx-4 shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] bg-[#e0e5ec]"
      >
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-400 to-cyan-500 text-transparent bg-clip-text">
          Quiz Complete!
        </h2>

        <div className="flex justify-center mb-10">
          <motion.div
            className="relative w-48 h-48 flex items-center justify-center"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-[#d1d9e6] stroke-current"
                strokeWidth="12"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <motion.circle
                className={`${
                  percentage >= 70 ? "text-emerald-500" : percentage >= 40 ? "text-yellow-500" : "text-red-500"
                } stroke-current`}
                strokeWidth="12"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{
                  strokeDashoffset: 251.2 - (percentage / 100) * 251.2,
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              ></motion.circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-5xl font-bold text-gray-700"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {percentage}%
              </motion.span>
            </div>
          </motion.div>
        </div>

        {percentage >= 70 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-[5px_5px_10px_#b8b9be,_-5px_-5px_10px_#ffffff]">
              <motion.div
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ duration: 0.5, repeat: 5, repeatDelay: 1 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}

        <div className="text-center mb-10">
          <p className="text-2xl font-semibold text-gray-700">
            You scored {score} out of {totalQuestions}
          </p>
          <p className="mt-4 text-gray-600 font-medium">
            {percentage >= 80
              ? "Excellent! You're a master of this subject!"
              : percentage >= 60
                ? "Great job! You have a solid understanding."
                : percentage >= 40
                  ? "Good effort! Keep studying to improve."
                  : "Keep practicing! You'll get better with time."}
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex justify-center">
          <NeuButton onClick={onRestart} variant="primary">
            Try Again
          </NeuButton>
        </motion.div>
      </motion.div>
    </div>
  )
}
