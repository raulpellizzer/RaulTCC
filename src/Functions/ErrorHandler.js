"use strict";

const fs         = require('fs');
const constants  = require('./consts');

class ErrorHandler {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.errorPath = constants.errorPath;
    }

    /**
     * Logs error into the error file
     * 
     * @param error String
     * @returns
     */
    ErrorMessageLog(error) {
        fs.appendFileSync(this.errorPath, error);
    }
}

module.exports = ErrorHandler;