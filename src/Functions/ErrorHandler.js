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

    ErrorMessageLog(error) {
        fs.appendFileSync(this.errorPath, error);
    }
}

module.exports = ErrorHandler;