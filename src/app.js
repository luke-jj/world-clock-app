/*
 * World Clock App - Application
 * Copyright (c) 2019 Luca J
 * Licensed under the MIT license.
 */

'use strict';

/**
 * App dependencies.
 * @private
 */

const { getTime } = require('./time.js');

/**
 * Application variables.
 * @private
 */

const locations = process.argv.slice(2);

/**
 * Application Startup.
 * @private
 */

for (let location of locations) {
  getTime(location);
}

