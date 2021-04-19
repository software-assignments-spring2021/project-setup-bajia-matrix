const express = require("express");
const expect = require("chai").expect;
const nock = require("nock");
const axios = require("axios");

const mockUser = require("./mocks/user");
const url = require("./mocks/url");

// create new app separate to avoid testing on the server app
const app = express();
app.use("/profile", require("../routes/profile/profile"));

describe("Profile routes", () => {
    beforeEach(() => {
        nock(url)
            .get("/profile")
            .reply(200, mockUser);

        nock(url)
            .post("/profile")
            .reply(200, "200 OK: Successfully updated user");
    });

    describe("Get request to database", () => {
        it("should return a User object", async () => {
            axios.get(url + "/profile")
                .then(response => {
                    expect(typeof response.data).to.equal("object");
                    expect(response.data.name).to.equal("Cara Lyndon");
                    expect(response.data.email).to.equal("CaraLyndon@gmail.com");
                });
        });
    });

    describe("Post request to database", () => {
        it("should save a User object to database and return 200 OK", async () => {
            axios.post(url + "/profile")
                .then(response => {
                    expect(response.body.statusCode).to.equal(200);
                });
        });
    });
});

