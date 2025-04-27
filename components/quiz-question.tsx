"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

export function QuizQuestion({ question, onAnswer, answered, isCorrect }) {
  return (
    <div className="rounded-3xl p-8 max-w-3xl mx-auto shadow-[8px_8px_16px_#b8b9be,_-8px_-8px_16px_#ffffff] bg-[#e0e5ec]">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">{question.question}</h2>

      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            className={`
              w-full text-left p-6 rounded-2xl text-lg font-medium transition-all
              ${
                answered && option === question.answer
                  ? "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white shadow-[inset_5px_5px_10px_rgba(0,0,0,0.2),_inset_-5px_-5px_10px_rgba(255,255,255,0.1)]"
                  : answered && option !== question.answer
                    ? "bg-[#e0e5ec] text-gray-500 opacity-70 shadow-[5px_5px_10px_#b8b9be,_-5px_-5px_10px_#ffffff]"
                    : "bg-[#e0e5ec] text-gray-700 shadow-[5px_5px_10px_#b8b9be,_-5px_-5px_10px_#ffffff] hover:shadow-[2px_2px_4px_#b8b9be,_-2px_-2px_4px_#ffffff]"
              }
            `}
            onClick={() => onAnswer(option)}
            disabled={answered}
            whileTap={
              !answered ? { scale: 0.98, boxShadow: "inset 5px 5px 10px #b8b9be, inset -5px -5px 10px #ffffff" } : {}
            }
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {answered && option === question.answer && <CheckCircle className="h-6 w-6 text-white" />}
            </div>
          </motion.button>
        ))}
      </div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 rounded-2xl text-center shadow-[inset_5px_5px_10px_#b8b9be,_inset_-5px_-5px_10px_#ffffff]"
        >
          {isCorrect ? (
            <div className="text-emerald-600 flex items-center justify-center gap-2">
              <CheckCircle className="h-6 w-6" />
              <span className="text-xl font-bold">Correct!</span>
            </div>
          ) : (
            <div className="text-red-600 flex items-center justify-center gap-2">
              <XCircle className="h-6 w-6" />
              <span className="text-xl font-bold">Incorrect!</span>
              <span className="ml-2">The correct answer is: {question.answer}</span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
