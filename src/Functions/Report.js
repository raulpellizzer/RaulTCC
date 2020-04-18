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

    BuildReportInfos(searchTag, numberOfPages) {
        let header = "";
        // implementing

        header = "Product Searched: " + searchTag + "\nNumber of Pages Searched in BuscaPe: " + numberOfPages + "\n\n";
    }

    RegisterDataInFile(path, data) {
        fs.appendFileSync(path, data);
    }
}

module.exports = Report;