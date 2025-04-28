import React, { useState } from "react";
import WeekSelector from "./components/WeekSelector";
import Quiz from "./components/Quiz";
import { WeeklyQuiz } from "./data/quiz-data";

const App: React.FC = () => {
  const [screen, setScreen] = useState<"entry" | "weekSelect" | "quiz">(
    "entry"
  );
  const [selectedQuiz, setSelectedQuiz] = useState<WeeklyQuiz | null>(null);

  const handleStartPractice = () => {
    setScreen("weekSelect");
  };

  const handleSelectWeek = (quiz: WeeklyQuiz) => {
    setSelectedQuiz(quiz);
    setScreen("quiz");
  };

  const handleBackToWeekSelection = () => {
    setScreen("weekSelect");
    setSelectedQuiz(null);
  };

  return (
    <div className="app">
      {screen === "entry" && (
        <div className="entry-screen">
          <h1>NPTEL Memorizer</h1>
          <button onClick={handleStartPractice}>Start Practice</button>
        </div>
      )}

      {screen === "weekSelect" && (
        <WeekSelector onSelectWeek={handleSelectWeek} />
      )}

      {screen === "quiz" && selectedQuiz && (
        <Quiz quiz={selectedQuiz} onBack={handleBackToWeekSelection} />
      )}
    </div>
  );
};

export default App;
