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

    async LogError(searchTag) {
        let time = await this.date.GetCurrentFullDate();
        let message = time + "\nAn error has occured for: " + searchTag + " "
        message = message + "or no results were found\n\n";
        message = message + "--------------------------------------------------------------------------------------------------------------\n\n"

        await this.RegisterDataInFile(this.reportPath, message);
    }
}

module.exports = ErrorHandler;