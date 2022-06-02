const myError = (err) => {
  throw new Error(err);
};

//handler dictionary post operation:
export const handlePostDict = async (req, res) => {
  let response;
  const newRecord = new Dictionary({
    name: req.body.name,
    translation: req.body.translation,
    genre: req.body.genre,
    definitions: req?.body?.definitions,
    adjectives: req?.body?.adjectives,
    synonyms: req?.body?.synonyms,
  });
  try {
    const null_response = await Dictionary.findOne({ name: newRecord.name });
    if (
      null_response !== null
        ? myError(`Resource already exists`)
        : ((response = await newRecord.save()),
          res.status(200).json({ state: true, data: response }))
    );
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};
//handler for dictionary get operation:
export const getDictRecord = async (req, res) => {
  try {
    const allRecords = await Dictionary.find({}).exec();
    res.status(200).json({ state: true, data: allRecords });
  } catch (err) {
    res
      .status(500)
      .json({ state: false, message: `Not found - ${err.message}` });
  }
};
//handler for dictionary delete operation:
export const handleDeleteDict = async (req, res) => {
  try {
    const record = await Dictionary.findOne({ name: req.params.name });
    const resp = await record.remove();
    res.status(200).json({
      state: true,
      message: [`Resource was deleted`, resp],
    });
  } catch (err) {
    res.status(404).json({
      state: false,
      message: `Could not find resource ${err.message}`,
    });
  }
};
//handlers for dictionary update operations:
//todo: to update code soon...
const updateDictTrans = (req, res) => {};
const updateDictDefs = (req, res) => {};

//handler for batch-uploads from offlineStore.
//todo: should exist for {trans, dict & quiz}.
const handleBatchUpload = async (req, res) => {
  /* if more than one exists, then we can deal with it later... */
  /* handling this may brick the app down. */
  //todo: Try looping again next time, with B.S.O.N values.

  // //! To fetch from the online Posts docs to the new Words doc:
  // const staleWords = await Posts.find({});

  try {
    const uploads = await Words.create(req.body);
    res.status(200).json({ state: true, data: uploads });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
