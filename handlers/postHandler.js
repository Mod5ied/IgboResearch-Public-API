import { Dictionary } from "../models/dictionary.js";
import { Words } from "../models/words.js";

export const handlePostWords = async (constant) => {
  let state;
  const newRecord = new Words({
    name: constant.name,
    genre: constant.genre,
    translation: constant.translation,
  });

  const isExists = await Words.findOne({ name: newRecord.name });
  if (isExists !== null) {
    return (state = false);
  }
  return (state = await newRecord.save());
};

export const handlePostDict = async (constant) => {
  let state;
  const newRecord = new Dictionary({
    name: constant.name,
    genre: constant.genre,
    translation: constant.translation,
    definitions: constant.definitions,
    adjectives: constant.adjectives,
    synonyms: constant.synonyms,
  });
  const isExists = await Dictionary.findOne({ name: newRecord.name });
  if (isExists !== null) {
    return (state = false);
  }
  return (state = await newRecord.save());
};

export const handleQuizPost = async (model = {}, constant) => {
  let state;
  const resp = model.find({question: constant.question})
  if(resp === null || resp.length === 0) {
    return (state = false);
  }
  const response = await model.create(constant);
  console.log(response);
  // if (response) {
  //   return (state = true);
  // }
  // return (state = false);
};

const handleBatchPost = () => {
  //todo...
};
