const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

/* 
    Takes a date string in the form of "YYYY/Month-Short/DD hh:mm:ss GMT-####" or
    "MM/DD/YYYY hh:mm GMT-0000" and a timezone to convert this date into. 
    Then it returns a date string in the new timezone using 24 hour time format.
*/
const standardizeTime = (date, tz) => {
    return (new Date(date)).toLocaleString("en-US", {
        timeZone: tz, 
        hour12: false, 
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit", 
        minute: "2-digit"
    });
};

/*
    This formats the different parts of the response (a Date object) to return
    the day of the week, the date, and time (in AM/PM)
*/
const generateResponse = (datetime) => {

    // get day
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const day = weekday[datetime.getDay()];

    // get date
    const date = datetime.toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
    });

    // get time: convert 24 to 12 AM/PM
    const time = datetime.toLocaleString("en-US", { 
        hour12: true,
        hour: "2-digit", 
        minute: "2-digit"
    });

    return [ day, date, time ];
};


// Sorts an array of strings containing datetime (key) and count (val) in decreasing order by count
const sortIt = (array) => {
    return (array.sort((a, b) => {
        const [key1, val1] = a;
        const [key2, val2] = b;
        if (val2 > val1) {
            return 1;
        }
        else if (val2 < val1) {
            return -1;
        }
        else {
            return 0;
        }
    }));
};

// This formats the input before sending it into the algorithm called calcBestTimes
const formatInput = (datetimes) => {
    const output = [];

    datetimes.forEach(datetime => {
        const dt = datetime.split(" ");
        const dateString = `${dt[3]}/${dt[1]}/${dt[2]} ${dt[4]} ${dt[5]}`;

        // convert to UTC timezone
        const stdTime = standardizeTime(dateString, "UTC");
        output.push(stdTime);
    })

    return output;
};

/*
    This algorithm counts the occurrence of each datetime and returns
    the most frequent datatimes
*/
const calcBestTimes = (datetimes) => {
    const counts = {};

    // count occurrences of each datetime
    datetimes.forEach(dt => {
        if (dt in counts) {
            counts[dt] = counts[dt] + 1;
        }
        else {
            counts[dt] = 1;
        }
    });

    // sort counts by most to least
    const sortedCounts = sortIt(Object.entries(counts));
  
    // take the top 5 (or less if size is < 5) most popular datetimes
    const top = Math.min(sortedCounts.length, 5);
    
    // initalize output
    const output = [];

    for (let i = 0; i < top; i++) {
        const key = sortedCounts[i][0];
        const value = sortedCounts[i][1];

        // if only one person choose this datetime, no need to recommend
        if (value === 1) {
            break;
        }

        output.push(key);
    }

    return output;
};

router.post("/", (req, res, next) => {
    console.log("post request on route /suggestedTimes");

    // extract data from the request 
    const requestData = req.body.availability;
    const currentTimezone = req.body.timezone;

    // initialize response
    const response = [];

    // process and clean the input data into an array of 'date, time' strings in UTC
    const input = formatInput(requestData);
    
    // calculate the best times
    const output = calcBestTimes(input);

    // convert best times to client's timezone
    output.forEach(dt => {
        const currDateTime = standardizeTime(dt + " GMT-0000", currentTimezone);
        const [ day, date, time ] = generateResponse(new Date(currDateTime));
        response.push({
            Day: day,
            Date: date,
            Time: time
        });
    });

    res.json(response);
});

module.exports = router;