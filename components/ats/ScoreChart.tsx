"use client"

import { motion } from "framer-motion"

interface ScoreChartProps {
  score: number
}

export function ScoreChart({ score }: ScoreChartProps) {
  const circumference = 2 * Math.PI * 40 // Radius 40
  const strokeDashoffset = circumference - (score / 100) * circumference

  let color = "text-red-500"
  if (score >= 50) color = "text-yellow-500"
  if (score >= 75) color = "text-blue-500"
  if (score >= 90) color = "text-green-500"

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-slate-100"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          cx="64"
          cy="64"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-3xl font-bold ${color}`}>{score}</span>
        <span className="text-xs text-slate-500 uppercase font-medium">Score</span>
      </div>
    </div>
  )
}
