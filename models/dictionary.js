import mongoose from "mongoose";
const { Schema, model } = mongoose;

const DictionarySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  answers: {
    type: String,
    trim: true,
    lowercase: true,
  },
  translations: [answers],
  adjectives: [answers],
  synonyms: [answers],
});

export const Dictionary = model("Dictionary", DictionarySchema);
