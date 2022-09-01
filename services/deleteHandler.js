export const handleDelete = async (model = {}, deleteConstant = "") => {
  let deleteResponse;
  const response = await model.find({ name: deleteConstant });
  if (response === null || response.length === 0) {
    return (deleteResponse = false);
  }
  //* Checks how many res and deletes-many if > 1 || < 1
  if (response.length === 1) {
    await model.deleteOne({ name: deleteConstant });
    return (deleteResponse = true);
  }
  await model.deleteMany({ name: deleteConstant });
  return (deleteResponse = true);
};

export const handleQuizDelete = async (model = {}, deleteCode = 0) => {
  let deleteResponse;
  const response = await model.findOne({ code: deleteCode });
  if(response === null || response.length === 0) {
    return (deleteResponse = false)
  }
  if (response.length === 1) {
    await model.deleteOne({ code: deleteCode });
    return (deleteResponse = true);
  }
  await model.deleteMany({ code: deleteCode });
  return (deleteResponse = true);
};
