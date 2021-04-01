const express = require("express");
const expect = require("chai").expect;
const request = require("supertest");

// create new app separate to avoid testing on the server app
const app = express();
app.use("/", require("../routes/home/home"));

describe("Home routes", () => {
    describe("Get request to database", () => {
        it("should return a JSON object", async () => {
            const response = await request(app).get("/?userid=123");
            expect(response.body).to.not.equal({});
        });
    });

    describe("Delete request to database", () => {
        it("should delete a JSON object from database and return 200 OK", async () => {
            const response = await request(app).delete("/?userid=123&eventid=123");
            expect(response.statusCode).to.equal(200);
        });
    });
});

