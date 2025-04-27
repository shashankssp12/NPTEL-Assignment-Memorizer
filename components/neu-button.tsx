"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function NeuButton({ children, onClick, className = "", variant = "primary" }) {
  const [isPressed, setIsPressed] = useState(false)

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-emerald-400 to-cyan-500 text-white"
      case "secondary":
        return "bg-[#e0e5ec] text-gray-700"
      case "success":
        return "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white"
      case "danger":
        return "bg-gradient-to-r from-red-400 to-red-600 text-white"
      default:
        return "bg-[#e0e5ec] text-gray-700"
    }
  }

  return (
    <motion.button
      className={`
        relative px-8 py-4 rounded-2xl text-lg font-medium
        ${getVariantStyles()}
        ${className}
      `}
      style={{
        boxShadow: isPressed
          ? "inset 5px 5px 10px rgba(0, 0, 0, 0.2), inset -5px -5px 10px rgba(255, 255, 255, 0.1)"
          : "8px 8px 16px rgba(0, 0, 0, 0.15), -8px -8px 16px rgba(255, 255, 255, 0.8)",
      }}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  )
}
