import logger from "./logger.js";

//* Logs can be saved to a database/persistent dataHub here!
export const saveLogs = (req, res, next) => {
    const response = res.data;
    logger.info({ resCode: 200, response: response });
};
