import { Application } from "../app/app.js";

//handler to get current app state.
export const handleGetState = async (req, res, next) => {
  const app = new Application()
  res.status(200).json(app._appState).data = {
    source: "App State",
    state: app._appState, //?? why not working!
  };
  next()
};
