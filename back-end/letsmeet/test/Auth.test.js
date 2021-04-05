const express = require("express");
const expect = require("chai").expect;
const request = require("supertest");

// create new app separate to avoid testing on the server app
const app = express();
app.use("/auth", require("../routes/auth/auth"));


describe("Authorization sign up/ and sign in", () => {
    describe("Get request to database", () => {
        it("should return a token that verifies the user", async () => {
            const response = await request(app).get("/auth");
            expect(response.body).to.not.equal({});
        });
    });

    describe("Post request to database", () => {
        it("should save a JSON object to database and return 200 OK", async () => {
            const response = await request(app).post("/auth").send({
                id: {
                    $oid: "222"
                }
            });
            expect(response.statusCode).to.equal(200);
        });
    });
});
