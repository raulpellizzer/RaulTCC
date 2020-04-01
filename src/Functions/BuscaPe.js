const ChromeDriver = require('./ChromeDriver');

class BuscaPe {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.chromeDriver = new ChromeDriver();
    }

    ChromeDriverStartUp() {
        this.driver = this.chromeDriver.DriverStartUp();
    }

    NavigateToBuscaPe() {
        this.driver.get('https://buscape.com.br');
    }

    MaximizeWindow() {
        this.driver.manage().window().maximize();
    }

    ScrollToBottom() {
        this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    }

    SearchItem() {

    }
    
}

module.exports = BuscaPe;