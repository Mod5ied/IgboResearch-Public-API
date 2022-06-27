//todo: create a separate handler for the dictionary doc.
//** The arrays of the dict needs spacial cases to update. */

export const handleUpdate = async (model, constant = {}) => {
  let updateResponse;
  let toUpdate = await model.findOne({ name: constant.name });

  const values = Object.values(constant);
  if (values[0] === undefined || toUpdate === null) {
    return (updateResponse = false);
  }
  toUpdate.name = constant.name || toUpdate?.name;
  toUpdate.genre = constant?.genre || toUpdate?.genre;
  toUpdate.translation = constant?.translation || toUpdate?.translation;
  await toUpdate.save();
  return (updateResponse = true);
};

export const handleQuizUpdate = async (model, constant = {}) => {
  let updateResponse;
  let toUpdate = await model.findOne({ _id: constant.id });

  const values = Object.values(constant);
  if (values[0] === undefined || toUpdate === null) {
    return (updateResponse = false);
  }
  /* spread-operator doesn't work with save function. */
  toUpdate.answerRight = constant?.answerRight || toUpdate.answerRight;
  toUpdate.answerWrong = constant?.answerWrong || toUpdate.answerWrong;
  toUpdate.answerWrong1 = constant?.answerWrong1 || toUpdate.answerWrong1;
  toUpdate.answerWrong2 = constant?.answerWrong2 || toUpdate.answerWrong2;
  await toUpdate.save();
  return (updateResponse = true);
};
