const express = require("express");
const expect = require("chai").expect;
const nock = require("nock");
const axios = require("axios");

const mockEvent = require("./mocks/event");
const url = require("./mocks/url");

// create new app separate to avoid testing on the server app
const app = express();
app.use("/", require("../routes/home/home"));

describe("Home routes", () => {
    beforeEach(() => {
        nock(url)
            .get("/")
            .reply(200, mockEvent);
    });

    describe("Get request to database", () => {
        it("should return an Event object", async () => {
            axios.get(url)
                .then(response => {
                    expect(typeof response.data).to.equal("object");
                    expect(response.data.title).to.equal("Birthday Party");
                    expect(response.data.creator).to.equal("Cara Lyndon");
                });
        });
    });
});

