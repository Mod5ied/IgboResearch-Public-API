const myError = (err) => {
  throw new Error(err);
};

export const handleQuiz = async (model, constant) => {
  let updatedResponse;
  let toUpdate = await model.findOne({name: constant.name})
  if(constant.translation !== null){
      toUpdate.translation = constant.translation;
  }
};

export const handleQuizUpdate = async (model = {}, constant = {}) => {
  let updateResponse;
  let toUpdate = await model.findOne({ _id: constant.id });
  if (constant.answer !== null) {
    toUpdate.answerRight = constant.answer || toUpdate.answerRight;
    // toUpdate.answerWrong = constant?.answerWrong || toUpdate.answerWrong;
    // toUpdate.answerWrong1 = constant?.answerWrong1 || toUpdate.answerWrong1;
    // toUpdate.answerWrong2 = constant?.answerWrong2 || toUpdate.answerWrong2;
    await toUpdate.save();
    return (updateResponse = true);
  }
  updateResponse = false;
  return myError(`Failed to update - ${err.message}`);
};
