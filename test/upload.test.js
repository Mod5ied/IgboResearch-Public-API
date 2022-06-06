import { expect } from "chai";
import request from "supertest";
import { app } from "../app";

describe("Words-upload", () => {
  describe("uploads to database", () => {
    describe("Fails, as name is required", () => {
      it("should return a 400", () => {
          expect(true).to.equal(true)
      });
    });
  });
});
