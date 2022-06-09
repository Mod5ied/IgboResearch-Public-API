import { DatabaseWorkers } from "../handlers/database.js";
import { app } from "../app.js";
import request from "supertest";
import mongoose from "mongoose";
import { expect } from "chai";
const req = request(app);
const { connectDb } = DatabaseWorkers;

describe("UPDATES", () => {
  describe("Updates word based on category(genre or translation)", () => {
    it("should fail to update words if entries are left blank", (done) => {
      const constant = {};
      req
        .patch("/update/words")
        .send(constant)
        .then((res) => {
          console.log(res.body);
          //   expect(res.body.state).to.be.false;
        })
        .catch((err) => done(err));
    });
    // it("should update the word", (done) => {
    //   const constant = {
    //     name: "mother",
    //     genre: "verb",
    //     translation: "nne",
    //   };
    //   req
    //     .patch("/update/words")
    //     .send(constant)
    //     .then((res) => {})
    //     .catch((err) => done(err));
    // });
  });
  //   describe("Updates dictionary based on category(genre or translation)", () => {
  //     it("should fail to update the dictionary if entries are left blank", () => {});
  //     it("should update the dictionary", () => {});
  //   });
  //   describe("Updates search quizzes", () => {
  //     describe("should update the dictionary quiz based on category(ansRight, ansWrong)", () => {
  //       it("should fail if entries are left blank", () => {});
  //       it("should update the search quiz based on category", () => {});
  //     });
  //   });
  //   describe("Updates dictionary quizzes", () => {
  //     describe("should update the dictionary quiz based on category(ansRight, ansWrong1, ansWrong2)", () => {
  //       it("should fail if entries are left blank", () => {});
  //       it("should update the dictionary quiz based on category", () => {});
  //     });
  //   });
});
