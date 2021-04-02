const express = require("express");
const expect = require("chai").expect;
const request = require("supertest");

// create new app separate to avoid testing on the server app
const app = express();
app.use("/suggestedTimes", require("../routes/events/suggestedTimes"));

describe("SuggestedTimes routes", () => {
    describe("get best times with input of 2 repeating times (size < 5) ", () => {
        it("should return 2 suggestions", async () => {
            const data = {
                availability: [
                    "Tue Apr 13 2021 09:00:00 GMT-0400 (Eastern Daylight Time)",
                    "Sun Apr 11 2021 13:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Sun Apr 11 2021 13:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Tue Apr 13 2021 09:00:00 GMT-0400 (Eastern Daylight Time)"
                ],
                timezone: "America/New_York"
            };
            const response = await request(app).post("/suggestedTimes").send(data);
            expect(response.body).to.eql([
                {Day: "Tuesday", Date: "04/13/2021", Time: "09:00 AM"},
                {Day: "Sunday", Date: "04/11/2021", Time: "01:00 PM"}
            ]);
        });
    });

    describe("get best times with input containing no repeating times (pretending to contain times for only 1 user)", () => {
        it("should return an empty JSON array", async () => {
            const data = {
                availability: [
                    "Fri Apr 09 2021 11:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Tue Apr 13 2021 16:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Sun Apr 11 2021 13:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Mon Apr 12 2021 16:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Tue Apr 13 2021 15:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Mon Apr 12 2021 15:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Tue Apr 13 2021 09:00:00 GMT-0400 (Eastern Daylight Time)"
                ],
                timezone: "America/New_York"
            };
            
            const response = await request(app).post("/suggestedTimes").send(data);
            expect(response.body).to.eql([]);
        });
    });

    describe("get best times with input containing repeating times of 2, 2, and 4 (varied amounts of repeating times) (size >= 5) (most common use case)", () => {
        it("should return the times that repeated 4 times, 2 times, and 2 times", async () => {
            const data = {
                availability: [
                    "Fri Apr 09 2021 11:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Tue Apr 13 2021 16:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Sun Apr 11 2021 13:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Mon Apr 12 2021 16:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Mon Apr 12 2021 16:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Tue Apr 13 2021 15:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Mon Apr 12 2021 15:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Mon Apr 12 2021 16:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Fri Apr 09 2021 11:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Tue Apr 13 2021 09:00:00 GMT-0400 (Eastern Daylight Time)",
                    "Mon Apr 12 2021 16:00:00 GMT-0400 (Eastern Daylight Time)", 
                    "Tue Apr 13 2021 09:00:00 GMT-0400 (Eastern Daylight Time)"
                ],
                timezone: "America/New_York"
            };
            const response = await request(app).post("/suggestedTimes").send(data);
            expect(response.body).to.eql([
                {Day: "Monday", Date: "04/12/2021", Time: "04:00 PM"},
                {Day: "Friday", Date: "04/09/2021", Time: "11:00 AM"},
                {Day: "Tuesday", Date: "04/13/2021", Time: "09:00 AM"}
            ]);
        });
    });
});