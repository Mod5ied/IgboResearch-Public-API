import { appState } from "../handlers/database.js";

//handler to get current app state.
export const handleGetState = async (req, res, next) => {
  res.status(200).json(appState).data = {
    source: "App State",
    state: appState,
  };
  next()
};
