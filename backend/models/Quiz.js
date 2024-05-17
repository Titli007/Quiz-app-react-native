const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the structure of the question subdocument
const questionSchema = new Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true },
}, {
    _id: false // Prevents automatic id generation for subdocuments
});

// Define the main Quiz schema
const quizSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    totalPoints: { type: Number, required: true },
    timeLimit: { type: Number, required: true }, // time limit in minutes
    questions: [questionSchema] // array of questions
}, {
    timestamps: true // automatically add createdAt and updatedAt fields
});

// Create the Quiz model based on the schema
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;

