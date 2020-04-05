const constants = require('./consts');

class ChromeDriver {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        
    }

    /**
     * Builds the driver for google chrome
     * 
     * @returns {WebDriver} WebDriver for Google Chrome
     */
    DriverStartUp() {
        let driver = new constants.Builder().forBrowser("chrome").build();
        return driver;
    }
}

module.exports = ChromeDriver;