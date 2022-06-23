import { default as mongoose } from "mongoose";

const translation = new mongoose.Schema({
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

const DictionarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
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
  antonyms: [String]
});

export const Dictionary = mongoose.model("Dictionary", DictionarySchema);
