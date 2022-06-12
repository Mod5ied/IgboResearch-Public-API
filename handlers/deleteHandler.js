export const handleDelete = async (model = {}, deleteConstant = "") => {
  let deleteResponse;
  const word = await model.findOne({ name: deleteConstant });
  if (word === null) {
    return (deleteResponse = false);
  }
  await word.remove();
  return (deleteResponse = true);
};

export const handleQuizDelete = async (model = {}, deleteCode = "") => {
  let deleteResponse;
  const word = await model.findOne({ code: deleteCode });
  deleteResponse = await word.remove();
  return deleteResponse;
};
