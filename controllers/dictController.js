import { handleDelete } from "../services/deleteHandler.js";
import { handleGet, handleGetOne } from "../services/getHandler.js";
import { handlePostDict } from "../services/postHandler.js";
import { handleUpdate } from "../services/updateHandler.js";
import { ApiError } from "../errors/errorParser.js";
import { Dictionary } from "../models/dictionary.js";
import logger from "../utils/log/logger.js";

//handler dictionary post operation:
export const postDictRecord = async (req, res, next) => {
	let postResponse;
	console.log(req.body);
	const constant = {
		name: req.body.name,
		translation: req.body.translation,
		genre: req.body.genre,
		definitions: req.body.definitions,
		adjectives: req.body.adjectives,
		synonyms: req.body.synonyms,
	};
	postResponse = await handlePostDict(constant);
	if (!postResponse) {
		return next(ApiError.badRequest(`Resource already exists`));
	}
	res.status(200).json({ state: true }).data = {
		msg: `Resource created`,
		data: postResponse,
	};
	next();
};
//handler for dictionary get operation:
export const getDictRecord = async (req, res, next) => {
	const getResponse = await handleGet(Dictionary);
	if (getResponse === null) {
		return next(ApiError.notFoundRequest(`Resource does not exist`));
	}
	res.status(200).json({ state: true, data: getResponse }).data = getResponse;
};

//handler for getOne operations.
export const getOneRecord = async (req, res, next) => {
	const constant = req.params.record;
	const getResponse = await handleGetOne(Dictionary, constant);
	if (getResponse === null) {
		return next(ApiError.notFoundRequest(`Resource does not exists`));
	}
	res.status(200).json({ state: true, data: getResponse }).data = getResponse;
	next();
};
//handler for dictionary delete operation:
export const deleteDictRecord = async (req, res, next) => {
	const constant = req.body.name;
	const deleteResponse = await handleDelete(Dictionary, constant);
	if (!deleteResponse) {
		return next(ApiError.notFoundRequest(`Resource does not exist`));
	}
	res.status(200).json({
		state: true,
		message: `Resource was deleted`,
	}).data = `Resource was deleted`;
	next();
};
//handlers for dictionary update operations:
//todo: to update code soon...
export const patchDictRecord = async (req, res, next) => {
	let updatedResponse;
	const constant = {
		id: req.body.id,
		name: req.body.name,
		genre: req.body.genre,
		translation: req.body.translation,
		definitions: req.body.definitions,
		adjectives: req.body.adjectives,
		synonyms: req.body.synonyms,
	};
	updatedResponse = await handleUpdate(Dictionary, constant);
	if (!updatedResponse) {
		return next(ApiError.notFoundRequest(`Resource does not exist`));
	}
	res.status(200).json({ state: true }).data = updatedResponse;
	next();
};

//handler for batch-uploads from offlineStore.
//todo: should exist for {trans, dict & quiz}.
export const batchUploadDict = async (req, res, next) => {
	//* Special, and needs to explicit the error, hence not using the uni-err handler.
	//* Logs a E11000 duplicate key error collection if redundancy is attempted.
	try {
		const uploads = await Dictionary.create(req.body);
		res.status(200).json({ state: true, data: uploads }).data = uploads;
		next();
	} catch (err) {
		const {
			keyValue: { name },
		} = err;
		logger.error(err.message);
		return res.status(500).json({ message: `${name} already exists in database` });
	}
};
