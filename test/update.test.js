import { expect } from "chai";
import mongoose from "mongoose";
import request from "supertest";
import { Application } from "../app/app.js";
const req = request(Application._server);
import { DatabaseWorkers } from "../handlers/database.js";
const { connectDb } = DatabaseWorkers;

describe("UPDATES WORDS", () => {
  before(async () => {
    await connectDb(process.env.local);
  });
  after(() => {
    mongoose.disconnect();
    mongoose.connection.close();
  });
  describe("Updates word based on category(genre or translation)", () => {
    describe("Updates the Search records", () => {
      it("should persist records if entries are left blank, and returns False", (done) => {
        const constant = {};
        req
          .patch("/api/v1/update/words")
          .send(constant)
          .then((res) => {
            const body = res.body;
            expect(body.state).to.be.false;
            done();
          })
          .catch((err) => done(err));
      });
      it("should update the word and return True if entries are complete", (done) => {
        const constant = {
          name: "mother",
          translation: "nne",
          genre: "verb",
        };
        req
          .patch("/api/v1/update/words")
          .send(constant)
          .then((res) => {
            const body = res.body;
            expect(body.state).to.be.true;
            done();
          })
          .catch((err) => done(err));
      });
    });
  });
  describe("Updates dictionary based on category(genre or translation)", () => {
    // it("should return False, but persist record if entry-values are left blank", (done) => {
    //   const constant = {};
    //   req
    //     .patch("/api/v1/update/dict")
    //     .send(constant)
    //     .then((res) => {
    //       const body = res.body;
    //       expect(body.state).to.be.false;
    //       done();
    //     })
    //     .catch((err) => done(err));
    // });
    //todo: to be handled soon after middleware is fixed.
    // it("should return True if entry-values are at least two", (done) => {
    // });
  });
  describe("Updates Quizzes based on category(ansRight, ansWrong)", () => {
    describe("Updates the search quiz", () => {
      it("should return False if entry-values are left blank or something went wrong", (done) => {
        const constant = {};
        req
          .patch("/api/v1/update/quiz/search")
          .send(constant)
          .then((res) => {
            const body = res.body;
            expect(body.state).to.be.false;
            done();
          })
          .catch((err) => done(err));
      });
      it("should return True if entry-values are at least two", (done) => {
        const constant = {
          id: "62a058d965fd7e6529727e35",
          answerWrong: "bibluu",
        };
        req
          .patch("/api/v1/update/quiz/search")
          .send(constant)
          .then((res) => {
            const body = res.body;
            expect(body.state).to.be.true;
            done();
          })
          .catch((err) => done(err));
      });
    });
    describe("Updates the dictionary quiz", () => {
      it("should return False if entry-values are left blank or something went wrong", (done) => {
        const constant = {}
        req 
          .patch("/api/v1/update/quiz/dict")
          .send(constant)
          .then(res => {
            const body = res.body;
            expect(body.state).to.be.false
            done()
          })
          .catch(err => done(err));
      });
      it("should return True, if update was a success", (done) => {
        const constant = {
          id: "6299e99f4e3e2b9d786a892c",
          answerWrong1: "enyi"
        }
        req 
          .patch("/api/v1/update/quiz/dict")
          .send(constant)
          .then(res => {
            const body = res.body;
            expect(body.state).to.be.true
            done()
          })
          .catch(err => done(err));
      });
    });
  });
});
