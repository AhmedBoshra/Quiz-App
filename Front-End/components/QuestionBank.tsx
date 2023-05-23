import { useEffect, useState } from "react";
import axios from "axios";
import QuestionEditor from "./EditQuestions";
import DeleteQuestion from "./DeleteQuestion";

import React from "react";
import DeleteConfirmation from "./DeleteQuestion";

interface Question {
  _id: string;
  name: string;
  category: string;
  subcategory: string;
  mark: number;
  expectedTime: number;
  correctAnswers: string[];
  createdBy: string;
  created_at: Date;
  answers: Answer[];
}

interface Answer {
  name: string;
  description: string;
}

const QuestionBankPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletingQuestionId, setDeletingQuestionId] = useState("");

  useEffect(() => {
    // Fetch the question data from the server
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleEditClick = (question: Question) => {
    setEditingQuestion(question);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  const handleSaveEdit = async (editedQuestion: Question) => {
    try {
      // Send the edited question to the server to update
      await axios.put(
        `http://localhost:3000/api/questions/${editedQuestion._id}`,
        editedQuestion
      );

      // Update the question in the local state
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question._id === editedQuestion._id ? editedQuestion : question
        )
      );

      setEditingQuestion(null);
      // Show success message
    } catch (error) {
      console.error("Error saving question edit:", error);
    }
  };

  // Deletion
  const handleDelete = (questionId: string) => {
    setShowDeleteConfirmation(true);
    setDeletingQuestionId(questionId);
  };

  const handleConfirmDelete = async () => {
    try {
      // Send a request to delete the question from the server
      await axios.delete(
        `http://localhost:3000/api/questions/${deletingQuestionId}`
      );

      // Update the question list in the local state by filtering out the deleted question
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== deletingQuestionId)
      );

      // Show success message or perform any other necessary actions
    } catch (error) {
      console.error("Error deleting question:", error);
    } finally {
      // Reset the delete confirmation state
      setShowDeleteConfirmation(false);
      setDeletingQuestionId("");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeletingQuestionId("");
  };

  return (
    <div>
      <h2>Question Bank</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Mark</th>
            <th>Expected Time</th>
            <th>Correct Answers</th>
            <th>Created By</th>
            <th>Answers</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <React.Fragment key={question._id}>
              {editingQuestion?._id === question._id ? (
                <QuestionEditor
                  question={question}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <tr>
                  <td>{question._id}</td>
                  <td>{question.name}</td>
                  <td>{question.category}</td>
                  <td>{question.subcategory}</td>
                  <td>{question.mark}</td>
                  <td>{question.expectedTime}</td>
                  <td>{question.correctAnswers.join(", ")}</td>
                  <td>{question.createdBy}</td>
                  <td>
                    <ul>
                      {question.answers.map((answer) => (
                        <li key={answer.name}>
                          <strong>{answer.name}:</strong> {answer.description}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEditClick(question)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(question._id)}
                    >
                      Delete
                    </button>
                    {showDeleteConfirmation &&
                      deletingQuestionId === question._id && (
                        <DeleteConfirmation
                          questionId={question._id}
                          onConfirm={handleConfirmDelete}
                        />
                      )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div></div>
    </div>
  );
};

export default QuestionBankPage;
