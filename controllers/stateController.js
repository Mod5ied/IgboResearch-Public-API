import { appState } from "../handlers/database.js";

const myError = (err) => {
  throw new Error(err);
};

//handler to get current app state.
export const handleGetState = async (req, res) => {
  try {
    res.status(200).json(app_state);
  } catch (err) {
    res
      .status(400)
      .json({ state: false, message: `Could not get state - ${err.message}` });
  }
};
