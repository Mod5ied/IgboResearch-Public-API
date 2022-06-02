import mongoose from "mongoose";
const { Schema, model } = mongoose;

const translation = new Schema({
  commonTranslate: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  primitive: [
    {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
    },
  ],
});

const DictionarySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  translation: [translation],
  genre: {
    type: String,
    trim: true,
    lowercase: true,
  },
  definitions: [String],
  adjectives: [String],
  synonyms: [String],
});

export const Dictionary = model("Dictionary", DictionarySchema);
