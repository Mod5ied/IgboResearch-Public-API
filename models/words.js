import { default as mongoose } from "mongoose";

const WordsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
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
const PostsSchema = new mongoose.Schema({
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

export const Words = mongoose.model("Words", WordsSchema);
export const Posts = mongoose.model("Posts", PostsSchema);
