export const handleDelete = async (model = {}, deleteConstant = "") => {
  let deleteResponse;
  const response = await model.find({ name: deleteConstant });
  if (response === null || response.length === 0) {
    return (deleteResponse = false);
  }
  //* Checks how many res and deletes-many if > 1 || < 1
  console.log(response.length);
  if (response.length === 1) {
    await model.deleteOne({ name: deleteConstant });
    return (deleteResponse = true);
  }
  await model.deleteMany({ name: deleteConstant });
  return (deleteResponse = true);
};

export const handleQuizDelete = async (model = {}, deleteCode = "") => {
  let deleteResponse;
  const word = await model.findOne({ code: deleteCode });
  deleteResponse = await word.remove();
  return deleteResponse;
};
