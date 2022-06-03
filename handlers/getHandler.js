//todo: future: find words that match strings no matter if its not exact match(maybe on the F.E).
export const handleGet = async (model) => {
  const getResponse = await model.find({}).exec();
  return getResponse;
  // //! To fetch from the online Posts docs to the new Words doc: ✅
  // const staleWords = await Posts.find({});
};

