const constants = require('./consts');

class ChromeDriver {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        
    }

    DriverStartUp() {
        let driver = new constants.Builder().forBrowser("chrome").build();
        return driver;
    }
}

module.exports = ChromeDriver;