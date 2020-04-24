"use strict";

const csvWriter = require('csv-writer');

class Excel {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        
    }

    test() {
        const csvWriterObject = csvWriter.createObjectCsvWriter;
        const csvFileWriter = csvWriterObject({
        path: 'out.csv',
        header: [
            {id: 'name', title: 'Name'},
            {id: 'surname', title: 'Surname'},
            {id: 'age', title: 'Age'},
            {id: 'gender', title: 'Gender'},
        ]
        });

        const data = [
        {
            name: 'John',
            surname: 'Snow',
            age: 26,
            gender: 'M'
        }, {
            name: 'Clair',
            surname: 'White',
            age: 33,
            gender: 'F',
        }, {
            name: 'Fancy',
            surname: 'Brown',
            age: 78,
            gender: 'F'
        }
        ];

        csvFileWriter
        .writeRecords(data)
        .then(()=> console.log('The CSV file was written successfully'));
    }

}

module.exports = Excel;