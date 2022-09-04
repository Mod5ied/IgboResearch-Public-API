import pkg from "mongoose";
const { Schema, model } = pkg;

const SearchQuizSchema = new Schema({
  // quizCode: {
  //   //todo: a custom incrementor function here // at cntlr.
  // },
  question: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  answerRight: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  answerWrong: { type: String, trim: true, lowercase: true },
});
const DictQuizSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  answerRight: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  answerWrong1: { type: String, trim: true, lowercase: true },
  answerWrong2: { type: String, trim: true, lowercase: true },
  // quizCode: {
  // },
});

export const SearchQuiz = model("SearchQuiz", SearchQuizSchema);
export const DictQuiz = model("DictQuiz", DictQuizSchema);
