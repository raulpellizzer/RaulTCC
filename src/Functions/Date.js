"use strict";

const DatePtBR = require('date-pt-br')
const date     = new DatePtBR()

class Date {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        
    }

    /**
     * Gets the current date and time in the format dd/mm/yyyy, hh:mm:ss
     *
     */
    async GetCurrentFullDate() {
        return await date.getDateTime();
    }
}

module.exports = Date;