const express = require("express");
const expect = require("chai").expect;
const request = require("supertest");

// create new app separate to avoid testing on the server app
const app = express();
app.use("/splitCosts", require("../routes/events/splitCosts"));

describe("SplitCosts routes", () => {
    describe("Algorithm to split the cost of supplies", () => {
        it("should put a list of supplies through an algorithm and get the cost each person owes", async () => {
            const data = 
            {title: "Lunch Date",
            description: "dATE",
            supplies: [
              { id: 1, supply: "supply1", amount: 12, name: "attendee1", owed: 0 },
              { id: 2, supply: "supply2", amount: 5, name: "attendee2", owed: 0 },
              { id: 3, supply: "supply3", amount: 9, name: "attendee3", owed: 0 },
              { id: 4, supply: "supply4", amount: 1, name: "attendee4", owed: 0 },
              { id: 5, supply: "supply5", amount: 0, name: "attendee5", owed: 0 },
            ]
        }
            const response = await request(app).post("/splitCosts").send(data);
            expect(response.body).to.eql([
                { id: 1, supply: "supply1", amount: 12, name: "attendee1", owed: 6.60 },
                { id: 2, supply: "supply2", amount: 5, name: "attendee2", owed: -0.40 },
                { id: 3, supply: "supply3", amount: 9, name: "attendee3", owed: 3.60},
                { id: 4, supply: "supply4", amount: 1, name: "attendee4", owed: -4.40 },
                { id: 5, supply: "supply5", amount: 0, name: "attendee5", owed: -5.40 },
            ]);
        });
    });
});
