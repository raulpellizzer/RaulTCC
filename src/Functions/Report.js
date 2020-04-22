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
        this.errorPath  = 'C:\\TCC\\src\\data\\errors.txt';
    }

    SetReportPath(path) {
        this.reportPath = path;
    }

    async LogError(searchTag) {
        let time = await this.date.GetCurrentFullDate();
        let message = time + "\nAn error has occured for: " + searchTag + " "
        message = message + "or no results were found\n\n";
        message = message + "--------------------------------------------------------------------------------------------------------------\n\n"

        await this.RegisterDataInFile(this.reportPath, message);
    }

    async BuildReportInfos(searchTag, numberOfPages, currentPage, totalOfProducts) {
        let header = "";
        let time   = "";

        time = await this.date.GetCurrentFullDate();

        header = time + "\nProduct Searched: " + searchTag;
        header = header + "\nNumber of Pages Informed for the search: " + numberOfPages;
        header = header + "\nNumber of Pages Searched in BuscaPe: " + currentPage;
        header = header + "\nTotal Products Found: " + totalOfProducts + "\n\n"
        header = header + "--------------------------------------------------------------------------------------------------------------\n\n"
        
        return header;
    }

    RegisterDataInFile(path, data) {
        try {
            fs.appendFileSync(path, data);
        } catch (error) {
            fs.appendFileSync(this.errorPath, error);
        }
    }
}

module.exports = Report;