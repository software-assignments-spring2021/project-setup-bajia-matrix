const express = require("express");
const expect = require("chai").expect;
const request = require("supertest");
const axios = require("axios");


// create new app separate to avoid testing on the server app
const app = express();
app.use("/splitCosts", require("../routes/events/splitCosts"));

describe("SplitCosts routes", () => {
    describe("Post request to database", () => {
        it("should put a list of supplies through an algorithm and get the cost each person owes", async () => {
            axios.post("/splitCosts")
                .then(response => {
                    expect(response.body.statusCode).to.equal(200);
                });
        });
    });
});
