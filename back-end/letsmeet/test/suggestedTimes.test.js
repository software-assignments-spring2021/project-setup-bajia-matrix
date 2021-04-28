const express = require("express");
const expect = require("chai").expect;
const request = require("supertest");

// create new app separate to avoid testing on the server app
const app = express();
app.use("/suggestedTimes", require("../routes/events/suggestedTimes"));

describe("SuggestedTimes routes", () => {
    describe("Get best times with input of 2 repeating times (size < 5) ", () => {
        it("should return 2 suggestions", async () => {
            const data = {
                availability: [
                    "2021-04-23T16:00:00.000Z",
                    "2021-04-24T16:00:00.000Z",
                    "2021-04-23T16:00:00.000Z",
                    "2021-04-24T16:00:00.000Z"
                ]
            };
            const response = await request(app).post("/suggestedTimes").send(data);
            expect(response.body).to.eql([
                { Day: 'Friday', Date: '04/23/2021', Time: '12:00 PM' },
                { Day: 'Saturday', Date: '04/24/2021', Time: '12:00 PM' }
            ]);
        });
    });

    describe("Get best times with input containing no repeating times (pretending to contain times for only 1 user)", () => {
        it("should return an empty JSON array", async () => {
            const data = {
                availability: [
                    "2021-04-23T15:00:00.000Z",
                    "2021-04-24T15:00:00.000Z",
                    "2021-04-25T15:00:00.000Z",
                    "2021-04-26T15:00:00.000Z",
                    "2021-04-27T15:00:00.000Z",
                    "2021-04-28T15:00:00.000Z",
                    "2021-04-29T15:00:00.000Z",
                ]
            };
            
            const response = await request(app).post("/suggestedTimes").send(data);
            expect(response.body).to.eql([]);
        });
    });

    describe("Get best times with input containing repeating times of 2, 2, and 4 (varied amounts of repeating times) (size >= 5) (most common use case)", () => {
        it("should return the times that repeated 4 times, 2 times, and 2 times", async () => {
            const data = {
                availability: [
                    "2021-04-23T16:00:00.000Z",
                    "2021-04-24T16:00:00.000Z",
                    "2021-04-25T16:00:00.000Z",
                    "2021-04-26T16:00:00.000Z",
                    "2021-04-27T16:00:00.000Z",
                    "2021-04-28T16:00:00.000Z",
                    "2021-04-29T16:00:00.000Z",
                    "2021-04-23T16:00:00.000Z",
                    "2021-04-24T16:00:00.000Z",
                    "2021-04-25T16:00:00.000Z",
                    "2021-04-23T16:00:00.000Z",
                    "2021-04-23T16:00:00.000Z"
                ]
            };
            const response = await request(app).post("/suggestedTimes").send(data);
            expect(response.body).to.eql([
                { Day: 'Friday', Date: '04/23/2021', Time: '12:00 PM' },
                { Day: 'Saturday', Date: '04/24/2021', Time: '12:00 PM' },
                { Day: 'Sunday', Date: '04/25/2021', Time: '12:00 PM' }
            ]);
        });
    });
});