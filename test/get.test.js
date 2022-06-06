import { expect } from "chai";
import request from "supertest";
import { app } from "../app";
const req = request(app);

describe("Words-upload", () => {
  describe("uploads to database", () => {
    describe("Fails, as name is required", () => {
      it("should return a 200 OK response", (done) => {
        req
          .get("/api/v1/allWords")
          .then((res) => {
            expect(res.status).to.equal(200);
            done();
          })
          .catch((err) => done(err));
      });
    });
  });
});
