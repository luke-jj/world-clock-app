# Worldclock Application
A simple and small command-line application that retrieves and prints the
current date and time for a specified region or city from the
[worldtimeapi](http://worldtimeapi.org).

## Installation
Install the latest version of node (v10.0.0+) and npm (v6.0.0+).
No additional dependencies are required.

## Usage
Start the app in terminal from the project folder with:

    npm start <locationname> <locationname> ...

or use node directly:

    node src/app.js <locationname> <locationname> ...

For a list of all 386 available zones and locations see
[locations](http://worldtimeapi.org/api/timezone).

### Examples

    node src/app.js Europe Singapore

    npm start london rome 'los angeles'
