"use strict";

const fs = require('fs');

class Report {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.reportPath = "";
    }

    SetReportPath(path) {
        this.reportPath = path;
    }

    GetReportPath() {
        return this.reportPath;
    }

    RegisterDataInFile(path, data) {
        fs.appendFileSync(path, data);
    }
}

module.exports = Report;