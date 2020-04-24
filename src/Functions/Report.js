"use strict";

const fs           = require('fs');
const Date         = require('./Date');
const ErrorHandler = require('./ErrorHandler');

class Report {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.errorHandler   = new ErrorHandler();
        this.date           = new Date();
        this.txtReportPath  = "";
    }

    SetTXTReportPath(path) {
        this.txtReportPath = path;
    }

    async BuildTXTReportInfos(searchTag, numberOfPages, currentPage, totalOfProducts) {
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
            this.errorHandler.ErrorMessageLog(error);
        }
    }
}

module.exports = Report;