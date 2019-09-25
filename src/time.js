/*
 * World Clock App - Module
 * Copyright (c) 2019 Luca J
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

const http = require('http');

/**
 * Module exports.
 * @private
 */

module.exports.getTime = requestTimezones;

/**
 * Retrieve, format and print the current time for a given location.
 * The location must exist in the timezones.json manifest provided by the api.
 *
 * @param {string} location
 * @private
 */

function requestTime(location) {
  http.get(`http://worldtimeapi.org/api/timezone/${location}`, (res) => {
    let rawData = '';

    res.on('data', (chunk) => rawData += chunk);

    res.on('end', () => {
      const parsedData = JSON.parse(rawData);
      const time = new Date(parsedData.datetime.split('.')[0]);

      console.log(`The current time in ${parsedData.timezone} is ${time.getHours()}:${time.getMinutes()} ${time.toDateString()} ${parsedData.abbreviation} - UTC${parsedData.utc_offset}.`);
    });
  });
}

/**
 * Get a timezone manifest from the api, search for the input location and
 * pass the corresponding zone/location on to the requestTime() function.
 *
 * @param {string} location name to be queried.
 * @public
 */

function requestTimezones(location) {
  http.get('http://worldtimeapi.org/api/timezone', (res) => {
    let rawData = '';
    const preparedLocation = location.trim().toLowerCase().replace(' ', '_');

    res.on('data', (chunk) => rawData += chunk);

    res.on('end', () => {
      const parsedData = JSON.parse(rawData);
      const zone = parsedData.find((zone) => {
        return zone.toLowerCase().includes(preparedLocation);
      });

      if (!zone) {
        console.log(`Location ${location} not found in the timezone manifest.`);
        return;
      }

      requestTime(zone);
    });
  });
}

