import { appState } from "../handlers/database.js";

//handler to get current app state.
export const handleGetState = async (req, res) => {
  try {
    res.status(200).json(appState);
  } catch (err) {
    res
      .status(400)
      .json({ state: false, message: `Could not get state - ${err.message}` });
  }
};
