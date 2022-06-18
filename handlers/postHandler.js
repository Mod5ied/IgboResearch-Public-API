export const handlePost = async (model = {}, constant = {}) => {
  let state;
  const newRecord = new model({
    name: constant.name,
    genre: constant.genre,
    translation: constant.translation,
    definitions: constant?.definitions,
    adjectives: constant?.adjectives,
    synonyms: constant?.synonyms,
  });

  const isExists = await model.findOne({ name: newRecord.name });
  if (isExists !== null) {
    return (state = false);
  }
  await newRecord.save();
  return (state = true);
};

export const handleQuizPost = async (model = {}, constant = []) => {
  let state;
  const response = await model.create(constant);
  if (response) {
    return (state = true);
  }
  return (state = false);
  //todo: see if can look through each for prior existence in document.
};

const handleBatchPost = () => {
  /* while we're yet to figure out how to check if a batch's record
     already exists, this feature lies within the "controllers" itself.
  */
};
