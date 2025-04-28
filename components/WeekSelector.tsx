import React from "react";
import { assignmentData } from "../data/quiz-data";

interface WeekSelectorProps {
  onWeekSelect: (weekId: string) => void;
}

const WeekSelector: React.FC<WeekSelectorProps> = ({ onWeekSelect }) => {
  const weeks = assignmentData.getWeeks();

  return (
    <div className="week-selector">
      <h2>Select a Week to Start From</h2>
      <div className="week-list">
        {weeks.map((week) => (
          <button
            key={week.id}
            className="week-button"
            onClick={() => onWeekSelect(week.id)}
          >
            {week.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekSelector;
