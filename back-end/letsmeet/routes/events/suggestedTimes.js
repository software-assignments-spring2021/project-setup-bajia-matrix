const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// This formats the input before sending it into the algorithm called calcBestTimes.
const formatInput = (datetimes) => {
    const output = [];

    datetimes.forEach(datetime => {
        const dateTimeSplit = datetime.split("T");
        const dateSplit = dateTimeSplit[0].split("-");
        const timeSplit = dateTimeSplit[1].split(".");

        // format: year/month/day 00:00:00 GMT-000
        const dateString = `${dateSplit[0]}/${dateSplit[1]}/${dateSplit[2]} ${timeSplit[0]} ${timeSplit[1]}`;

        // convert to UTC timezone (input is already UTC)
        // const stdTime = standardizeTime(dateString, "UTC");
        output.push(dateString);
    });

    return output;
};

// Sorts an array of strings containing datetime (key) and count (val) in decreasing order by count.
const sorter = (array) => {
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

/*
    This algorithm counts the occurrence of each datetime and returns
    the most frequent datatimes.
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
    const sortedCounts = sorter(Object.entries(counts));
  
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

/*
    This formats the different parts of the response (a Date object) to return
    the day of the week, the date, and time (in AM/PM).
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

router.post("/", (req, res, next) => {
    console.log("post request on route /suggestedTimes");

    // extract data from the request 
    const requestData = req.body.availability;

    // initialize response
    const response = [];

    // process and clean the input data into an array of 'date, time' strings in UTC
    const input = formatInput(requestData);
    
    // calculate the best times
    const output = calcBestTimes(input);

    // convert best times to client's timezone before sending back
    output.forEach(dt => {

        // format: 2021-04-21T19:00:00.000Z
        const dtSplit = dt.split(" ");
        const dateSplit = dtSplit[0].split("/");
        const isoFormat = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}T${dtSplit[1]}.${dtSplit[2]}`;
        const [ day, date, time ] = generateResponse(new Date(isoFormat));

        let reformatTime;
        const splitTime = time.split(":");
        if (parseInt(splitTime[0]) < 10) {
            splitTime[0] = splitTime[0].charAt('1');
            reformatTime = splitTime[0] + ':' + splitTime[1];
        } 
        else {
            reformatTime = time
        }

        response.push({
            Day: day,
            Date: date,
            Time: reformatTime
        });
    });

    res.json(response);
});

module.exports = router;