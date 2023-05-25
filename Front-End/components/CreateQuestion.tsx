import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";
import jwt from "jsonwebtoken";

interface Answer {
  name: string;
  description: string;
  [key: string]: string;
}

const CreateQuestionForm = () => {
  const { token } = useAuth();
  const decodedToken = jwt.decode(token);
  console.log(decodedToken);

  // State for holding the form data
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    mark: 0,
    expectedTime: 0,
    correctAnswers: [],
    createdBy: "",
    created_at: new Date(),
    answers: [{ name: "", description: "" }],
  });

  // Handle form input changes
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle changes in the correctAnswers field
  const handleCorrectAnswersChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      correctAnswers: value.split(",").map((answer: string) => answer.trim()),
    }));
  };

  // Handle changes in the answer fields
  const handleAnswerChange = (
    index: number,
    field: keyof Answer,
    value: string
  ) => {
    setFormData((prevFormData) => {
      const updatedAnswers = [...prevFormData.answers];
      updatedAnswers[index] = {
        ...updatedAnswers[index],
        [field]: value,
      };
      return {
        ...prevFormData,
        answers: updatedAnswers,
      };
    });
  };

  // Handle adding a new answer field
  const handleAddAnswer = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      answers: [...prevFormData.answers, { name: "", description: "" }],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // Convert the created_at date to ISO format
      const created_atISO = formData.created_at.toISOString();

      // Prepare the question data to send to the API
      const questionData = {
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory,
        mark: formData.mark,
        expectedTime: formData.expectedTime,
        correctAnswers: formData.correctAnswers,
        createdBy: formData.createdBy,
        created_at: created_atISO,
        answers: formData.answers,
      };

      // Send the question data to the API
      const response = await axios.post(
        "http://localhost:3000/api/questions",
        questionData
      );

      // Handle the response and perform any necessary actions
      console.log("Question created successfully:", response.data);

      // Reset the form after successful submission
      setFormData({
        name: "",
        category: "",
        subcategory: "",
        mark: 0,
        expectedTime: 0,
        correctAnswers: [],
        createdBy: "",
        created_at: new Date(),
        answers: [{ name: "", description: "" }],
      });

      // Show a success message to the user
      alert("Question created successfully!");
    } catch (error) {
      console.error("Error creating question:", error);
      // Handle the error and display an error message to the user
      alert("An error occurred while creating the question. Please try again.");
    }
  };

  return (
    <Container>
      <h2>Create Question</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Question Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="subcategory">
          <Form.Label>Subcategory</Form.Label>
          <Form.Control
            type="text"
            name="subcategory"
            value={formData.subcategory}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="mark">
          <Form.Label>Mark</Form.Label>
          <Form.Control
            type="number"
            name="mark"
            value={formData.mark}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="expectedTime">
          <Form.Label>Expected Time (in minutes)</Form.Label>
          <Form.Control
            type="number"
            name="expectedTime"
            value={formData.expectedTime}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Render answer fields dynamically */}
        <Form.Group controlId="answers">
          <Form.Label>Answers</Form.Label>
          {formData.answers.map((answer, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                name={`answers[${index}].name`}
                value={answer.name}
                onChange={(e) =>
                  handleAnswerChange(index, "name", e.target.value)
                }
                placeholder="Answer"
                required
              />
              <Form.Control
                type="text"
                name={`answers[${index}].description`}
                value={answer.description}
                onChange={(e) =>
                  handleAnswerChange(index, "description", e.target.value)
                }
                placeholder="Description"
                required
              />
            </div>
          ))}
          <Button variant="secondary" onClick={handleAddAnswer}>
            Add Answer
          </Button>
        </Form.Group>

        <Form.Group controlId="correctAnswers">
          <Form.Label>Correct Answers (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            name="correctAnswers"
            value={formData.correctAnswers.join(", ")}
            onChange={handleCorrectAnswersChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="createdBy">
          <Form.Label>Created By</Form.Label>
          <Form.Control
            type="text"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="created_at">
          <Form.Label>Created At</Form.Label>
          <Form.Control
            type="datetime-local"
            name="created_at"
            value={formData.created_at.toISOString().substr(0, 16)}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateQuestionForm;
