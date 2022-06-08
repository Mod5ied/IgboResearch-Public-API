import express from "express";

export class Error {
  static handleNetError = (errCode, message) => {
    const userError = [400, 401, 402, 403, 404];
    const userInputError = []; //get from joi errors.
    // const syntaxError = ['ReferenceError: Word is not defined', 'ReferenceError: Word is not defined']
    const serverError = [500, 501, 502, 503, 504];
    switch (key) {
      case value:
        break;

      default:
        break;
    }
  };
  static handleDbError = (errCode, message) => {
    //figure out mongoose error codes & messages & use here.
  };
}
