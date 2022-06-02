const myError = (err) => {
  throw new Error(err);
};

//handler for quiz create operation:
export const handleCreateQuiz = async (req, res) => {
  const type = {
    search: "search",
    dict: "dict",
  };
  switch (req.params.quiz) {
    case type.search:
      try {
        const response = await SearchQuiz.create(req.body);
        res.status(200).json({ state: true, data: response });
      } catch (error) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    case type.dict:
      try {
        const response = await DictQuiz.create(req.body);
        res.status(200).json({ state: true, data: response });
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    default:
      break;
  }
};
//handler for quiz get operation:
export const handleGetQuiz = async (req, res) => {
  const types = {
    search: "search",
    dict: "dict",
  };
  switch (req.params.allQuiz) {
    case types.search:
      try {
        const response = await SearchQuiz.find({});
        res.status(200).json({ state: true, data: response });
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    case types.dict:
      try {
        const response = await DictQuiz.find({});
        res.status(200).json({ state: true, data: response });
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    default:
      break;
  }
};
//handler for  quiz delete operation:
export const handleDeleteQuiz = async (req, res) => {
  const types = {
    search: "search",
    dict: "dict",
  };
  //todo: delete quizzes by another factor other than id.
  switch (req.params.quiz) {
    case types.search:
      try {
        const resp = await SearchQuiz.findOne({ _id: req.body.id });
        const response = await resp.remove();
        res.status(200).json({ state: true, data: response });
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    case types.dict:
      try {
        const resp = await DictQuiz.findOne({ _id: req.body.id });
        const response = await resp.remove();
        res.status(200).json({ state: true, data: response });
      } catch (err) {
        res.status(500).json({ state: false, message: err.message });
      }
      break;
    default:
      break;
  }
};
//handler for quiz patch operation:
//todo.
const handleQuizPatch = async (req, res) => {};

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
