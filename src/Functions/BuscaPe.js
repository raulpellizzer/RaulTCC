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
        let element = await this.driver.wait(constants.until.elementLocated(constants.By.css('div.cardBody'), 15000));  
        element = await this.driver.findElements(constants.By.css('div.cardBody'));
        return element;
    }


    async GetProductData(element) {
        let productPrice = "";
        let mainValue = "";
        let centsValue = "";
        let productName = "";

        productPrice = await element.findElements(constants.By.css('div.cardInfo > div > div > a.price > span'));
        mainValue = await productPrice[0].findElements(constants.By.css('span.mainValue'));
        mainValue = await mainValue[0].getText();

        centsValue = await productPrice[0].findElements(constants.By.css('span.centsValue'));
        centsValue = await centsValue[0].getText();
        productPrice = mainValue + centsValue;

        productName = await element.findElements(constants.By.css("a[class='name']"));
        productName = await productName[0].getText();

        console.log("Produto: " + productName + " - " + productPrice);
        
    }
    
}

module.exports = BuscaPe;