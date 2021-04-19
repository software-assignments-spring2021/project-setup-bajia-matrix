const express = require("express");
const expect = require("chai").expect;
const nock = require("nock");
const axios = require("axios");

const mockEvent = require("./mocks/event");
const url = require("./mocks/url");

// create new app separate to avoid testing on the server app
const app = express();
app.use("/events", require("../routes/events/events"));

describe("Events routes", () => {
    beforeEach(() => {
        nock(url)
            .get("/events")
            .reply(200, mockEvent);

        nock(url)
            .post("/events")
            .reply(200, "200 OK: Successfully updated event");

        nock(url)
            .delete("/events")
            .reply(200, "200 OK: Successfully deleted event");
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

    describe("Post request to database", () => {
        it("should save an Event object to database and return 200 OK", async () => {
            axios.post(url + "/events")
                .then(response => {
                    expect(response.body.statusCode).to.equal(200);
                });
        });
    });

    describe("Delete request to database", () => {
        it("should delete an Event object from database and return 200 OK", async () => {
            axios.delete(url + "/events")
                .then(response => {
                    expect(response.body.statusCode).to.equal(200);
                });
        });
    });
});

