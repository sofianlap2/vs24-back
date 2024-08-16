const express = require("express");
const Question = require("../models/question");
const User = require("../models/user");
const Authorisation = require("../security/authorisation");
const asyncErrorHandler = require("../security/asyncErrorHandler");

const router = express.Router();

router.post('/:email/addQuestion', Authorisation, asyncErrorHandler(async (req, res) => {
    const user = await User.findById(req.userId); // Fetch user details
    const existingQuestion = await Question.findOne({
        question: req.body.question,
        typeQ: req.body.typeQ
    });

    if (existingQuestion) {
        return res.status(400).json({ message: 'La question avec le même contenu et le même type existe déjà' });
    }

    const newQuestion = new Question({
        user: req.userId, // Use the user ID from the request object
        question: req.body.question,
        typeQ: req.body.typeQ,
        limitRep: req.body.limitRep,
    });

    const savedQuestion = await newQuestion.save();
    res.status(200).json(savedQuestion);
}));

module.exports = router;