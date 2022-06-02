const myError = (err) => {
  throw new Error(err);
};

//handler for translator post operation:
export const handlePostWord = async (req, res) => {
  let response;
  const newWord = new Words({
    name: req.body.name,
    translation: req.body.translation,
    definitions: req.body.definitions,
    genre: req.body.genre,
  });

  try {
    const null_response = await Words.findOne({ name: newWord.name });
    if (
      null_response !== null
        ? myError(`Resource already exists`)
        : ((response = await newWord.save()),
          res.status(200).json({ state: true, data: response }))
    );
  } catch (err) {
    res.status(500).json({ state: false, message: err.message });
  }
};
//handler for translator get operation:
//todo: future: find words that match strings no matter if its not exact match(maybe on the F.E).
export const handleGetWords = async (req, res) => {
  try {
    const allWords = await Words.find({});
    // //! To fetch from the online Posts docs to the new Words doc: ✅
    // const staleWords = await Posts.find({});
    res.status(200).json({ state: true, data: allWords });
  } catch (err) {
    res
      .status(500)
      .json({ state: false, message: `Not found - ${err.message}` });
  }
};
//handler for translator delete operation:
export const handleDeleteWord = async (req, res) => {
  try {
    const word = await Words.findOne({ name: req.params.name });
    const deleteResponse = await word.remove();
    res.status(200).json({
      state: true,
      message: [`Resource was deleted`, deleteResponse],
    });
  } catch (err) {
    res.status(404).json({
      state: false,
      message: `Could not find resource ${err.message}`,
    });
  }
};
//handler for translator update operations:
export const handleGenrePatch = async (req, res) => {
  let word;
  try {
    word = await Words.findOne({ name: req.body.name });
    if (req.body.genre != null) {
      word.genre = req.body.genre;
      try {
        const updatedProps = await word.save();
        res.json({ state: true, data: updatedProps });
      } catch (err) {
        return myError(`Failed to update - ${err.message}`);
      }
    }
  } catch (err) {
    res.status(404).json({
      state: false,
      message: `Could not update resource - ${err.message}`,
    });
  }
};
export const handleTransPatch = async (req, res) => {
  let word;
  try {
    word = await Words.findOne({ name: req.body.name });
    if (req.body.translation != null) {
      word.translation = req.body.translation;
      try {
        const updatedProps = await word.save();
        res.json({ state: true, data: updatedProps });
      } catch (err) {
        return myError(`Failed to update - ${err.message}`);
      }
    }
  } catch (err) {
    res.status(404).json({
      state: false,
      message: `Could not update resource - ${err.message}`,
    });
  }
};

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
