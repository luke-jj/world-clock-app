/*
 *
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const http = require('http');
const location = 'Tokyo'.toLowerCase();

/**
 * Module exports.
 * @private
 */

module.exports.getTime = requestTimezones;

/*
 * Retrieve, format and print the current time for a given location.
 * The location must exist in the timezones.json manifest provided by the api.
 *
 * @param {string} location
 * @public
 */

function requestTime(location) {
  http.get(`http://worldtimeapi.org/api/timezone/${location}`, (res) => {
    let rawData = '';

    res.on('data', (chunk) => {
      rawData += chunk;
    });

    res.on('end', () => {
      const parsedData = JSON.parse(rawData);
      // console.log(parsedData);

      const time = new Date(parsedData.datetime.split('.')[0]);
      // console.log(time);

      console.log(`The current time in ${parsedData.timezone} is ${time.getHours()}:${time.getMinutes()} ${time.toDateString()} ${parsedData.abbreviation} - UTC${parsedData.utc_offset}.`);
    });

  });
}

/*
 * Get a timezone manifest from the api.
 *
 * @param {string} location name to be passed on to the requestTime() function.
 */

function requestTimezones(location) {
  http.get('http://worldtimeapi.org/api/timezone', (res) => {
    let rawData = '';

    res.on('data', (chunk) => {
      rawData += chunk;
    });

    res.on('end', () => {
      const parsedData = JSON.parse(rawData);
      // console.log(parsedData);

      const zone = parsedData.find((zone) => {
        return zone.toLowerCase().includes(location.toLowerCase());
      });
      // console.log(zone);

      requestTime(zone);
    });
  });
}

