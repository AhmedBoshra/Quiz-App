const express = require("express");
const router = express.Router();
const { Question } = require("../models/question");

router.post("/questions", async (req, res) => {
  try {
    // Extract the question data from the request body
    const {
      id,
      name,
      category,
      subcategory,
      mark,
      expectedTime,
      correctAnswers,
      createdBy,
      answers,
    } = req.body;

    // Create a new question object using the Question model
    const question = new Question({
      id,
      name,
      category,
      subcategory,
      mark,
      expectedTime,
      correctAnswers,
      createdBy,
      answers,
    });

    // Save the question to the database
    const savedQuestion = await question.save();

    // Respond with the saved question as the result
    res.status(201).json(savedQuestion);
  } catch (error) {
    // Handle any errors that occur during the creation process
    console.error("Error: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the question." });
  }
});

module.exports = router;
