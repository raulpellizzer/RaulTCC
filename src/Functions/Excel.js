"use strict";

const csvWriter = require('csv-writer');
const constants = require('./consts');

class Excel {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.csvWriterObject = csvWriter.createObjectCsvWriter;
    }

    /**
     * Generates Excel Report
     * 
     * @param rawData Array - Data extracted from buscape
     */
    GenerateExcelReport(rawData) {
        let csvFileWriter = this.CreateWriterObject();
        let data = this.PrepareData(rawData);

        this.WriteDataToExcel(csvFileWriter, data);
    }

    /**
     * Prepares data for excel writing
     * 
     * @param rawData Array - Data extracted from buscape
     * @returns Array
     */
    PrepareData(rawData) {
        let data = [];
        let temp = {};
        
        for (let index = 0; index < rawData.length; index++) {
            for (let innerIndex = 0; innerIndex < rawData[index].productPrices.length; innerIndex++) {
                if (rawData[index].productPrices[innerIndex] == undefined)
                    continue;
                    temp = {
                        productName: rawData[index].productName,
                        productPrices: rawData[index].productPrices[innerIndex].Price
                    };
                    data.push(temp);
            }
            data.push(temp);
        }

        return data;
    }

    /**
     * Writes data to Excel
     * 
     * @param csvFileWriter Writer Object 
     * @param data Array - Data in the correct format for excel
     * @returns Array
     */
    WriteDataToExcel(csvFileWriter, data) {
        csvFileWriter
            .writeRecords(data)
            .then(() => {
                console.log('The CSV file was written successfully')
            });
    }

    /**
     * Creates writer object for excel
     * 
     * @returns {Object} writer object for excel
     */
    CreateWriterObject() {
        var csvFileWriter = this.csvWriterObject({
            path: constants.csvReportPath,
            header: [
                {id: 'productName', title: 'Product Name'},
                {id: 'productPrices', title: 'Product Price'}
            ]
            });

        return csvFileWriter;
    }   
}

module.exports = Excel;