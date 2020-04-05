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

    async NavigateToBuscaPe() {
        await this.driver.get('https://buscape.com.br');
        return this.driver;
    }

    async MaximizeWindow() {
        await this.driver.manage().window().maximize();
    }

    async ScrollToBottom() {
        await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    }

    QueryItem(searchTags) {
        let buscaPeSearchBar = this.driver.wait(constants.until.elementLocated(constants.By.name('q'), 10000));  
        buscaPeSearchBar.sendKeys(searchTags.MainTag, constants.Key.ENTER);
        return this.driver;
        
    }

    async GetProducts() {
        // WORKING 
        // let element = await this.driver.wait(constants.until.elementLocated(constants.By.css('div.cardBody > div.cardInfo > div > div > a.price > span > span.mainValue'), 15000));  
        // element = await this.driver.findElements(constants.By.css('div.cardBody > div.cardInfo > div > div > a.price > span > span.mainValue'));

        let element = await this.driver.wait(constants.until.elementLocated(constants.By.css('div.cardBody'), 15000));  
        element = await this.driver.findElements(constants.By.css('div.cardBody'));

        return element;
    }


    async GetProductData(element) {
        let elementPrice = await element.findElements(constants.By.css('div.cardInfo > div > div > a.price > span > span.mainValue'));
        // console.log("Teste preco: " + await elementPrice[0].getText());
        elementPrice = await elementPrice[0].getText();
        console.log("ElementPrice: " + elementPrice);



    }
    
}

module.exports = BuscaPe;