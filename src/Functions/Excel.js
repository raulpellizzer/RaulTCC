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

    GenerateExcelReport(rawData) {
        let csvFileWriter = this.CreateWriterObject();

        const data = [
            {
                productName: 'Produto 05',
                productPrices: '10.05'
            }, {
                productName: 'Produto 06',
                productPrices: '20.50'
            }, {
                productName: 'Produto 07',
                productPrices: '353.97'
            }
            ];

        this.WriteDataToExcel(csvFileWriter, data);
    }

    WriteDataToExcel(csvFileWriter, data) {
        csvFileWriter
            .writeRecords(data)
            .then(() => {
                console.log('The CSV file was written successfully')
            });
    }

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