"use strict";

const DatePtBR = require('date-pt-br')
const date = new DatePtBR()

class Date {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        
    }

    async GetCurrentFullDate() {
        return await date.getDateTime();
    }

}

module.exports = Date;