const express = require("express");
const expect = require("chai").expect;
const request = require("supertest");

// create new app separate to avoid testing on the server app
const app = express();
app.use("/events", require("../routes/events/events"));

describe("Events routes", () => {
    describe("Get request to database", () => {
        it("should return a JSON object", async () => {
            const response = await request(app).get("/events?eventid=123");
            expect(response.body).to.not.equal({});
        });
    });

    describe("Post request to database", () => {
        it("should save a JSON object to database and return 200 OK", async () => {
            const response = await request(app).post("/events").send({
                id: {
                    $oid: "123"
                }
            });
            expect(response.statusCode).to.equal(200);
        });
    });
});

