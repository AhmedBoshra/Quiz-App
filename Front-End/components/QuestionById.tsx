import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Assuming you're using React Router for routing

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

const QuestionById = () => {
  const { id } = useParams(); // Retrieve the question ID from the URL params
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    // Fetch the question data from the server
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/questions/${id}`
        );
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };

    fetchQuestion();
  }, [id]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Question: {question.name}</h2>
      <p>Category: {question.category}</p>
      <p>Subcategory: {question.subcategory}</p>
      <p>Mark: {question.mark}</p>
      <p>Expected Time: {question.expectedTime}</p>
      <p>Correct Answers: {question.correctAnswers.join(", ")}</p>
      <p>Created By: {question.createdBy}</p>
      <h4>Answers:</h4>
      <ul>
        {question.answers.map((answer) => (
          <li key={answer.name}>
            <strong>{answer.name}:</strong> {answer.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionById;
