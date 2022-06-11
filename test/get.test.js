// import { expect } from "chai";
// import mongoose from "mongoose";
// import request from "supertest";
// import { app } from "../app.js";
// const req = request(app);
// import { DatabaseWorkers } from "../handlers/database.js";
// const { connectDb } = DatabaseWorkers;

// describe("Words-fetch", () => {
//   describe("fetches words from Search-database", () => {
//     before(async() => {
//       //connect to mongoose.
//       await connectDb(process.env.local)
//     });
//     after(() => {
//       //disconnect from mongoose.
//       mongoose.disconnect()
//       mongoose.connection.close()
//     })
//     describe("Fails, as resource url does not exist", () => {
//       it("should return a 500 response", (done) => {
//         req
//           .get("/api/v1/allWord")
//           .then((res) => {
//             expect(res.status).to.equal(500);
//             done();
//           })
//           .catch((err) => done(err));
//       });
//     });
//     describe("Passes, fetches all the resource from Search-database", () => {
//       it("should return a 200 OK response", (done) => {
//         req
//           .get("/api/v1/allWords")
//           .then((res) => {
//             expect(res.status).to.equal(200);
//             expect(res.body).to.be.a("object");
//             expect(res.body.data).to.be.a('array')
//             expect(res.body.data.length).to.be.greaterThanOrEqual(1);
//             expect(res.body).to.haveOwnProperty('state').equal(true)
//             done();
//           })
//           .catch((err) => done(err));
//       });
//     });
//     // describe("Passes, fetches one word from Search-database", () => {
//     //   it("should return a 200 OK response", (done) => {
//     //     const searchKey = "mother";
//     //     req
//     //       .get(`/api/v1/allWords/${searchKey}`)
//     //       .then((res) => {
//     //         expect(res.status).to.equal(200);
//     //         expect(res.body.length).to.be.equal(1);
//     //         done();
//     //       })
//     //       .catch((err) => done(err));
//     //   });
//     // });
//     // describe("Fails, to fetch one word from Search-database", () => {
//     //   it("should return a 400 OK response", (done) => {
//     //     const searchKey = "mother";
//     //     req
//     //       .get(`/api/v1/allWords/${searchKey}`)
//     //       .then((res) => {
//     //         expect(res.status).to.equal(400 || 404);
//     //         expect(res.body.length).to.be.equal(0);
//     //         done();
//     //       })
//     //       .catch((err) => done(err));
//     //   });
//     // });
//   });
// });
