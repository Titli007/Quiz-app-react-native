const router = require('express').Router();
let Quiz = require('../models/quiz');

// Create a new Quiz
router.post('/add', async (req, res) => {

    console.log(req.body)
    const { name, description, totalPoints, timeLimit, questions } = req.body;

    const newQuiz = new Quiz({
        name,
        description,
        totalPoints,
        timeLimit,
        questions
    });

    try {
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});

// Retrieve all Quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json('Error: ' + error.message);
    }
});

// Retrieve a single Quiz by id
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        res.json(quiz);
    } catch (error) {
        res.status(404).json('Error: ' + error.message);
    }
});


// Delete a Quiz
router.delete('/delete/:id', async (req, res) => {
    try {
        await Quiz.findByIdAndDelete(req.params.id);
        res.json('Quiz deleted.');
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});


// Add a question to a Quiz
router.post('/add-question/:quizId', async (req, res) => {
    const { questionText, options, answer, point } = req.body;
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) return res.status(404).json('Quiz not found.');

        quiz.questions.push({ questionText, options, answer, point });
        await quiz.save();
        res.json('Question added successfully.');
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});

// Delete a question from a Quiz
router.delete('/delete-question/:quizId/:questionId', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) return res.status(404).json('Quiz not found.');

        // Remove the question from the questions array
        quiz.questions = quiz.questions.filter(q => q._id.toString() !== req.params.questionId);
        await quiz.save();
        res.json('Question deleted successfully.');
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});


// Add an option to a specific question
router.post('/add-option/:quizId/:questionId', async (req, res) => {
    const { option } = req.body;
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) return res.status(404).json('Quiz not found.');

        const question = quiz.questions.id(req.params.questionId);
        if (!question) return res.status(404).json('Question not found.');

        question.options.push(option);
        await quiz.save();
        res.json('Option added successfully.');
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});

// Remove an option from a specific question
router.delete('/remove-option/:quizId/:questionId/:optionIndex', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) return res.status(404).json('Quiz not found.');

        const question = quiz.questions.id(req.params.questionId);
        if (!question) return res.status(404).json('Question not found.');

        if (req.params.optionIndex >= question.options.length || req.params.optionIndex < 0) {
            return res.status(400).json('Invalid option index.');
        }

        question.options.splice(req.params.optionIndex, 1);
        await quiz.save();
        res.json('Option removed successfully.');
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});


module.exports = router;
