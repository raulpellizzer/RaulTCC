"use strict";

const fs   = require('fs');
const Date = require('./Date');

class Report {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.date       = new Date();
        this.reportPath = "";
    }

    SetReportPath(path) {
        this.reportPath = path;
    }

    async BuildReportInfos(searchTag, numberOfPages, totalOfProducts) {
        let header = "";
        let time   = "";

        time = await this.date.GetCurrentFullDate();
        header = time + "\nProduct Searched: " + searchTag + "\nNumber of Pages Searched in BuscaPe: " + numberOfPages + "\n";
        header = header + "Total Products Found: " + totalOfProducts + "\n\n"
        header = header + "--------------------------------------------------------------------------------------------------------------\n\n"

        return header;
    }

    RegisterDataInFile(path, data) {
        fs.appendFileSync(path, data);
    }
}

module.exports = Report;