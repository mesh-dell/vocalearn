// app/results/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

// Example data – normally fetched from API or passed via props
const resultsData = {
  assignmentName: "Math Assignment 1",
  questions: [
    {
      id: 1,
      question: "What is 2 + 2?",
      correctAnswer: "4",
      userAnswer: "4",
    },
    {
      id: 2,
      question: "What is 5 * 3?",
      correctAnswer: "15",
      userAnswer: "12",
    },
    {
      id: 3,
      question: "What is the square root of 16?",
      correctAnswer: "4",
      userAnswer: "4",
    },
  ],
};

export default function ResultsPage() {
  const { assignmentName, questions } = resultsData;

  // Calculate grade automatically
  const correctCount = questions.filter(
    (q) => q.userAnswer === q.correctAnswer
  ).length;
  const grade = Math.round((correctCount / questions.length) * 100);
  const status = grade >= 50 ? "Pass" : "Fail";

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Results</h1>
          <p className="text-lg text-gray-600">{assignmentName}</p>

          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-md bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl font-bold">
              {grade}%
            </div>
          </div>

          <p
            className={`text-lg font-semibold ${
              status === "Pass" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        </div>

        {/* Questions Review */}
        <div className="space-y-6">
          {questions.map((q) => {
            const isCorrect = q.userAnswer === q.correctAnswer;
            return (
              <div
                key={q.id}
                className={`p-4 rounded-lg ${
                  isCorrect
                    ? "bg-green-50 border border-green-400"
                    : "bg-red-50 border border-red-400"
                }`}
              >
                <p className="font-medium text-gray-800">
                  {q.id}. {q.question}
                </p>
                <p className="text-gray-700">
                  ✅ Correct Answer:{" "}
                  <span className="font-semibold">{q.correctAnswer}</span>
                </p>
                <p className="text-gray-500">
                  Your Answer:{" "}
                  <span
                    className={`font-semibold ${
                      isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {q.userAnswer}
                  </span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Button className="text-gray-700"><Link href={".."}>Go Back</Link></Button>
        </div>
      </div>
    </div>
  );
}

