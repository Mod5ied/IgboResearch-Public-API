import { expect } from "chai";
import mongoose from "mongoose";
import request from "supertest";
import { Application } from "../app/app.js";
const req = request(Application._server);
import { DatabaseWorkers } from "../handlers/database.js";
const { connectDb } = DatabaseWorkers;

describe("GET WORDS", () => {
  before(async () => {
    await connectDb(process.env.local);
  });
  after(() => {
    mongoose.disconnect();
    mongoose.connection.close();
  });
  describe("fetches words from Search-database", () => {
    describe("Fails, as resource url does not exist", () => {
      it("should return a 404 response", (done) => {
        req
          .get("/api/v1/allWord")
          .then((res) => {
            expect(res.status).to.equal(404);
            done();
          })
          .catch((err) => done(err));
      });
    });
    describe("Passes, fetches all the resource from Search-database", () => {
      it("should return a 200 OK response", (done) => {
        req
          .get("/api/v1/allWords")
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body.data).to.be.a("array");
            expect(res.body.data.length).to.be.greaterThanOrEqual(1);
            expect(res.body).to.haveOwnProperty("state").equal(true);
            done();
          })
          .catch((err) => done(err));
      });
    });
    describe("Passes, fetches One word from Search-database", () => {
      it("should return a 200 OK response", (done) => {
        const searchKey = "mother";
        req
          .get(`/api/v1/get/${searchKey}`)
          .then((res) => {
            const body = res.body;
            const bodyKeys = Object.keys(body);
            expect(res.status).to.equal(200);
            expect(bodyKeys.length).to.be.equal(2);
            done();
          })
          .catch((err) => done(err));
      });
    });
    describe("Fails, to fetch one word from Search-database", () => {
      it("should return a 400 response, as resource doesn't exist", (done) => {
        const searchKey = "moda";
        req
          .get(`/api/v1/get/${searchKey}`)
          .then((res) => {
            const body = res.body;
            expect(res.status).to.equal(404 || 400);
            expect(body.state).to.be.false;
            done();
          })
          .catch((err) => done(err));
      });
    });
  });
});
