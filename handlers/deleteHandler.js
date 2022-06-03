export const handleDelete = async (model = {}, deleteConstant = "") => {
  let deleteResponse;
  const word = await model.findOne({ name: deleteConstant });
  deleteResponse = await word.remove();
  return deleteResponse;
};

export const handleQuizDelete = async (model = {}, deleteCode = "") => {
  let deleteResponse;
  const word = await model.findOne({ code: deleteCode });
  deleteResponse = await word.remove();
  return deleteResponse;
};
