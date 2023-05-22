import React from "react";

const QuestionBankPage = () => {
  const questions = [
    {
      id: 1,
      name: "what is the capital of Egypt ?",
      category: "country",
      subcategory: "Africa",
    },
  ]; // Placeholder for questions, replace with actual data

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.name}</td>
              <td>{question.category}</td>
              <td>{question.subcategory}</td>
              <td>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBankPage;
