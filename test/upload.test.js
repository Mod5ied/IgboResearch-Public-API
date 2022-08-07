// import { expect } from "chai";
// import mongoose from "mongoose";
// import request from "supertest";
// import { Application } from "../app/app.js";
// const req = request(Application._server);
// import { DatabaseWorkers } from "../handlers/database.js";
// const { connectDb } = DatabaseWorkers;

// describe("Words-upload", () => {
//   describe("uploads to database", () => {
//     before(async () => {
//       //connect to mongoose.
//       await connectDb(process.env.local);
//     });
//     after(() => {
//       //disconnect from mongoose.
//       mongoose.disconnect();
//       mongoose.connection.close();
//     });
//     describe("Fails, as name is required", () => {
//       it("should return a 400", (done) => {
//         const inputPayload = {
//           translation: "Nkwu",
//           genre: "noun",
//         };
//         req
//           .post("/api/v1/post/word")
//           .send(inputPayload)
//           .then((res) => {
//             expect(res.status).to.equal(400);
//             expect(res.body.state).to.be.equal(false);
//             done();
//           })
//           .catch((err) => done(err));
//       });
//     });
//     describe("Passes, posts is saved to database", () => {
//       it("should return a 200", (done) => {
//         const inputPayload = {
//           name: "John",
//           translation: "Johnu",
//           genre: "noun",
//         };
//         req
//           .post("/api/v1/post/word")
//           .send(inputPayload)
//           .then((res) => {
//             expect(res.status).to.equal(400);
//             expect(res.body.state).to.be.equal(false);
//             done();
//           })
//           .catch((err) => done(err));
//       });
//     });
//   });
// });
