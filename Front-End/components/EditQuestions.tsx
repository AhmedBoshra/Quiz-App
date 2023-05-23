import React, { useState } from "react";

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

interface QuestionEditorProps {
  question: Question;
  onSave: (editedQuestion: Question) => void;
  onCancel: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  onSave,
  onCancel,
}) => {
  const [editedQuestion, setEditedQuestion] = useState<Question>({
    _id: question._id,
    name: question.name,
    category: question.category,
    subcategory: question.subcategory,
    mark: question.mark,
    expectedTime: question.expectedTime,
    correctAnswers: question.correctAnswers,
    createdBy: question.createdBy,
    created_at: question.created_at,
    answers: question.answers,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleAnswerChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const propertyName = name.split(".")[1];
    setEditedQuestion((prevQuestion) => {
      const updatedAnswers = [...prevQuestion.answers];
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        [propertyName]: value,
      };
      return {
        ...prevQuestion,
        answers: updatedAnswers,
      };
    });
  };

  const handleSaveClick = () => {
    onSave(editedQuestion);
    setShowSuccessMessage(true);
  };

  const handleCancelClick = () => {
    onCancel();
    setShowSuccessMessage(true);
  };

  return (
    <tr>
      <td>{question._id}</td>
      <td>
        <input
          type="text"
          name="name"
          value={editedQuestion.name}
          onChange={handleInputChange}
          style={{ width: "100px" }}
        />
      </td>
      <td>
        <input
          type="text"
          name="category"
          value={editedQuestion.category}
          onChange={handleInputChange}
          style={{ width: "100px" }}
        />
      </td>
      <td>
        <input
          type="text"
          name="subcategory"
          value={editedQuestion.subcategory}
          onChange={handleInputChange}
          style={{ width: "100px" }}
        />
      </td>
      <td>
        <input
          type="number"
          name="mark"
          value={editedQuestion.mark}
          onChange={handleInputChange}
          style={{ width: "50px" }}
        />
      </td>
      <td>
        <input
          type="number"
          name="expectedTime"
          value={editedQuestion.expectedTime}
          onChange={handleInputChange}
          style={{ width: "50px" }}
        />
      </td>
      <td>
        <input
          type="text"
          name="correctAnswers"
          value={editedQuestion.correctAnswers.join(", ")}
          onChange={handleInputChange}
          style={{ width: "100px" }}
        />
      </td>
      <td>
        <input
          type="text"
          name="createdBy"
          value={editedQuestion.createdBy}
          onChange={handleInputChange}
          style={{ width: "100px" }}
        />
      </td>
      <td>
        {editedQuestion.answers.map((answer, index) => (
          <div key={index}>
            <input
              type="text"
              name={`answers[${index}].name`}
              value={answer.name}
              onChange={(event) => handleAnswerChange(index, event)}
              style={{ width: "100px" }}
            />
            <input
              type="text"
              name={`answers[${index}].description`}
              value={answer.description}
              onChange={(event) => handleAnswerChange(index, event)}
              style={{ width: "100px" }}
            />
          </div>
        ))}
      </td>
      <td>
        {showSuccessMessage ? (
          <span className="success-message">Saved successfully!</span>
        ) : (
          <>
            <button className="btn btn-success" onClick={handleSaveClick}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default QuestionEditor;
