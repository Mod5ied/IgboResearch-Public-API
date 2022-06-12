import { expect } from "chai";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app.js";
const req = request(app);
import { DatabaseWorkers } from "../handlers/database.js";
const { connectDb } = DatabaseWorkers;

describe("DELETE WORDS", () => {
  before(async () => {
    await connectDb(process.env.local);
  });
  after(() => {
    mongoose.disconnect();
    mongoose.connection.close();
  });
  //Resource does not exist
  describe("Deletes Words from the Search Collection", () => {
    it("Passes, should return True if word exists and is deleted", (done) => {
      const constant = "bible";
      req
        .delete(`/api/v1/delete/word/${constant}`)
        .then((response) => {
          const body = response.body;
          expect(response.status).to.be.equal(200);
          expect(body.state).to.equal(true)
          done();
        })
        .catch((err) => done(err));
    });
    it("Fails, should return False and a 404 if word doesn't exist anymore OR at all, and delete fails", (done) => {
      const constant = "biblee";
      req
        .delete(`/api/v1/delete/word/${constant}`) 
        .then((response) => {
          const body = response.body;
          console.log(body);
          expect(response.status).to.be.equal(404);
          expect(body.state).to.equal(false)
          done();
        })
        .catch((err) => done(err));
    });
  });
  describe("Deletes Words from the Dictionary Collection", () => {
    it("Passes, should return True if word exists and is deleted", (done) => {
      const constant = "bible";
      req
        .delete(`/api/v1/delete/dict/${constant}`)
        .then((response) => {
          const body = response.body;
          expect(response.status).to.be.equal(200);
          expect(body.state).to.equal(true);
          done();
        })
        .catch((err) => done(err));
    });
    it("Fails, should return False and a 404 if word doesn't exist at all, and delete fails", (done) => {
      const constant = "biblee";
      req
        .delete(`/api/v1/delete/dict/${constant}`)
        .then((response) => {
          const body = response.body;
          expect(response.status).to.be.equal(404);
          expect(body.state).to.equal(false);
          done();
        })
        .catch((err) => done(err));
    });
  });
});
