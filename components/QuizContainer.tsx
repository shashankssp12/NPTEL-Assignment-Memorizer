import React, { useState } from "react";
import { assignmentData } from "../data/quiz-data";
import WeekSelector from "./WeekSelector";

// You would import your existing Quiz component here
// import Quiz from './Quiz';

const QuizContainer: React.FC = () => {
  const [selectedWeekId, setSelectedWeekId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<any[]>([]);

  const handleWeekSelect = (weekId: string) => {
    setSelectedWeekId(weekId);
    const assignmentsFromWeek = assignmentData.getAssignmentsFromWeek(weekId);
    setAssignments(assignmentsFromWeek);
  };

  return (
    <div className="quiz-container">
      {!selectedWeekId ? (
        <WeekSelector onWeekSelect={handleWeekSelect} />
      ) : (
        // Replace this with your actual Quiz component
        <div>
          <h2>Quiz Started from {selectedWeekId}</h2>
          <p>Number of assignments: {assignments.length}</p>
          <button onClick={() => setSelectedWeekId(null)}>
            Back to Week Selection
          </button>
          {/* <Quiz assignments={assignments} /> */}
        </div>
      )}
    </div>
  );
};

export default QuizContainer;
