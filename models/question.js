const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeEnum = {
    OUINON: "OUI/NON",
    SATISFACTION: "SATISFACTION",
};

const QuestionSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    question: {
        type: String,
        required: true,
    },
    typeQ: {
        type: String,
        enum: Object.values(TypeEnum),
        required: true,
    },
    limitRep: {
        type: Number,
        required: true,
    },
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;