const constants = require('./consts');

class BuscaPe {

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

    NavigateToBuscaPe(driver) {
        driver.get('https://buscape.com.br');
    }

    MaximizeWindow(driver) {
        driver.manage().window().maximize();
    }
    
}

module.exports = BuscaPe;
