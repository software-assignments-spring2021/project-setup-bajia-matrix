const express = require("express");
const expect = require("chai").expect;
const nock = require("nock");
const axios = require("axios");

const mockUser = require("./mocks/user");
const url = require("./mocks/url");

// create new app separate to avoid testing on the server app
const app = express();
app.use("/auth", require("../routes/auth/auth"));

describe("Auth routes", () => {
    beforeEach(() => {
        nock(url)
            .post("/auth")
            .reply(200, mockUser);
    });

    describe("Post request to database (Sign up)", () => {
        it("should save a new User object to database and return 200 OK", async () => {
            axios.post(url + "/auth/signup")
                .then(response => {
                    expect(response.body.statusCode).to.equal(200);
                });
        });
    });

    describe("Post request to database (Sign in)", () => {
        it("should authenticate and send back the User object with a 200 OK", async () => {
            axios.post(url + "/auth/signin")
                .then(response => {
                    expect(response.body.statusCode).to.equal(200);
                    expect(response.data.name).to.equal("Cara Lyndon");
                    expect(response.data.email).to.equal("CaraLyndon@gmail.com");
                });
        });
    });
});
