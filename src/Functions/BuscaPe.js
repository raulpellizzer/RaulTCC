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

    /**
     * Starts up the driver for google chrome
     * 
     */
    ChromeDriverStartUp() {
        this.driver = this.chromeDriver.DriverStartUp();
    }

    /**
     * Navigates to BuscaPe website
     */
    async NavigateToBuscaPe() {
        await this.driver.get('https://buscape.com.br');
    }

    /**
     * Maximizes current window of the webdriver
     */
    async MaximizeWindow() {
        await this.driver.manage().window().maximize();
    }

    /**
     * Scroll the current window of the webdriver to the bottom
     */
    async ScrollToBottom() {
        await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    }

    /**
     * Search for the specified tag in BuscaPe website
     * 
     * @param searchTags - String
     */
    QueryItem(searchTags) {
        let buscaPeSearchBar = this.driver.wait(constants.until.elementLocated(constants.By.name('q'), 10000));  
        buscaPeSearchBar.sendKeys(searchTags.MainTag, constants.Key.ENTER);
        return this.driver;   
    }

    /**
     * Get the elements from the first page
     * 
     * @returns {WebElement} A web element from buscape
     */
    async GetProducts() {
        let element = await this.driver.wait(constants.until.elementLocated(constants.By.css('div.cardBody'), 15000));  
        element = await this.driver.findElements(constants.By.css('div.cardBody'));
        return element;
    }

    /**
     * Retrieves data from an element
     * 
     * @param element - WebElement
     * @returns {Object} Object containing the product name and its main price, in buscape first page
     */
    async GetProductData(element) {
        try {
            let productPrice  = "";
            let productName   = "";

            productPrice = await this.GetProductPrice(element);
            productName = await this.GetProductName(element);

            let data = {productName, productPrice};

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Retrieves the name of an element in buscape first page
     * 
     * @param element - WebElement
     * @returns {String} Product name
     */
    async GetProductName(element) {
        let productName = "";

        productName = await element.findElements(constants.By.css("a[class='name']"));
        productName = await productName[0].getText();

        return productName;
    }

    /**
     * Retrieves the price of an element in buscape first page
     * 
     * @param element - WebElement
     * @returns {String} Product price
     */
    async GetProductPrice(element) {
        let productPrice  = "";
        let mainValue     = "";
        let centsValue    = "";

        productPrice = await element.findElements(constants.By.css('div.cardInfo > div > div > a.price > span'));
        mainValue = await productPrice[0].findElements(constants.By.css('span.mainValue'));
        mainValue = await mainValue[0].getText();

        centsValue = await productPrice[0].findElements(constants.By.css('span.centsValue'));
        centsValue = await centsValue[0].getText();
        productPrice = mainValue + centsValue;

        return productPrice;
    }
    
}

module.exports = BuscaPe;