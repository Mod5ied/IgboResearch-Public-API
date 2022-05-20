import { default as mongoose } from "mongoose";

const WordsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  translation: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  //todo: would be required after we setup apps dictionary
  definitions: {
    type: String,
    trim: true,
    lowercase: true,
    // required: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const SearchQuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  answerRight: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  answerWrong: { type: String, trim: true, lowercase: true },
});
const DictQuizSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  answerRight: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  answerWrong1: { type: String, trim: true, lowercase: true },
  answerWrong2: { type: String, trim: true, lowercase: true },
});

const Words = mongoose.model("Words", WordsSchema);
const SearchQuiz = mongoose.model("SearchQuiz", SearchQuizSchema);
const DictQuiz = mongoose.model("DictQuiz", DictQuizSchema);

export { Words, DictQuiz, SearchQuiz };
