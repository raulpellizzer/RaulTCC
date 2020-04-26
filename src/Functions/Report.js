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

    /** 
     * Sets the path for .txt report
     * 
     * @param path String
     * @returns Boolean
     */
    SetTXTReportPath(path) {
        this.txtReportPath = path;
    }

    /** 
     * Builds the report Header
     * 
     * @param searchTag String - The tag searched
     * @param numberOfPages String - The number of pages informed for the search
     * @param currentPage String - Number of pages actually searched
     * @param totalOfProducts String - Number of prodcuts found
     * @returns String
     */
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

    /** 
     * Generates the text report
     * 
     * @param path String - Path for the .txt report
     * @param data String - Data extracted from buscape
     * @returns String
     */
    RegisterDataInTXTFile(path, data) {
        try {
            fs.appendFileSync(path, data);
        } catch (error) {
            this.errorHandler.ErrorMessageLog(error);
        }
    }
}

module.exports = Report;