const ChromeDriver = require('./ChromeDriver');
const constants = require('./consts');

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

    SearchItem(searchTags) {
        let buscaPeSearchBar = this.driver.wait(constants.until.elementLocated(constants.By.name('q'), 10000));  
        buscaPeSearchBar.sendKeys(searchTags.MainTag, constants.Key.ENTER);
    }
    
}

module.exports = BuscaPe;