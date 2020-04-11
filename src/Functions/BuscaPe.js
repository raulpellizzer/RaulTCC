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

    async NavigateToPreviousPage() {
        await this.driver.navigate().back();
    }

    /**
     * Maximizes current window of the webdriver
     */
    async MaximizeWindow() {
        await this.driver.manage().window().maximize();
    }

    async DriverSleep(miliSeconds) {
        await this.driver.sleep(miliSeconds);
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
    }

    /**
     * Get the elements from the first page
     * 
     * @returns {WebElement} A web element from buscape
     */
    async GetProducts() {
        await this.driver.wait(constants.until.elementLocated(constants.By.css("div.cardBody > div.cardFooter > a[class*='Button']"), 15000));
        let element = await this.driver.findElements(constants.By.css("div.cardBody > div.cardFooter > a[class*='Button']"));

        return element;
    }

    /**
     * Retrieves data from an element
     * 
     * @param singleStore - boolean - Indicates if this product has only one seller
     * @param index - integer - the index of the outter loop
     * @returns {Object} Object containing the product name and its main price, in buscape first page
     */
    async GetProductData(singleStore, index) {
        try {
            let data = {};

            if (singleStore) {
                let productName = await this.GetSingleStoreProductName(index);
                let productPrices = await this.GetSingleStoreProductPrice(index);
                data = {productName, productPrices};
            } else {
                let productName = await this.GetProductName();
                let productPrices = await this.GetProductPrices();
                data = {productName, productPrices};
            }

            return data;

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Retrieves the name of an element in buscape first page
     * 
     * @returns {String} Product name
     */
    async GetProductName() {
        let productName = "";

        await this.driver.wait(constants.until.elementLocated(constants.By.css("h1[class='product-name'] > span"), 15000));
        productName = await this.driver.findElements(constants.By.css("h1[class='product-name'] > span"));
        productName = await productName[0].getText();

        return productName;
    }

    /**
     * Retrieves all prices for that specific product
     *
     * @returns {Array} Product prices
     */
    async GetProductPrices() {
        let data      = [];
        let prices    = "";
        let store     = "";
        let finalData = "";

        let elements = await this.driver.findElements(constants.By.css("ul[class='offers-list'] > li"));

        for (let index = 0; index < elements.length; index++) {
            prices = await elements[index].findElements(constants.By.css('div.r-cols > div.col-pricing.pricing > a > span.price > span.price__total'));
            store = await elements[index].findElements(constants.By.css('div.l-cols > div.col-store > a > img'));
            finalData = await store[0].getAttribute('alt') + ": " + await prices[0].getText()

            data.push(finalData);
        }

        data = data.sort(); // RE-IMPLEMENTAR:
        return data;
    }

    /**
     * Retrieves the name of a product that has only one seller (not multiple stores)
     * 
     * @param index - integer
     * @returns {Object} Object containing the product name and its main price, in buscape first page
     */
    async GetSingleStoreProductName(index) {
        let productName = "";
        let element     = "";
    
        await this.driver.wait(constants.until.elementLocated(constants.By.css('div.cardBody'), 15000));
        element = await this.driver.findElements(constants.By.css('div.cardBody'));
        element = element[index];
        productName = await element.findElements(constants.By.css("a[class='name']"));
        productName = await productName[0].getText();
    
        return productName;
    }
    
    /**
     * Retrieves the price of a product that has only one seller (not multiple stores)
     * 
     * @param index - integer
     * @returns {Array} array containing the product name and its main price, in buscape first page
     */
    async GetSingleStoreProductPrice(index) {
        let productPrice  = "";
        let mainValue     = "";
        let centsValue    = "";
        let element       = "";
        let store         = "";
        let price         = [];

        await this.driver.wait(constants.until.elementLocated(constants.By.css('div.cardBody'), 15000));
        element = await this.driver.findElements(constants.By.css('div.cardBody'));
        element = element[index];

        productPrice = await element.findElements(constants.By.css('div.cardInfo > div > div > a.price > span'));
        mainValue    = await productPrice[0].findElements(constants.By.css('span.mainValue'));
        mainValue    = await mainValue[0].getText();
    
        centsValue   = await productPrice[0].findElements(constants.By.css('span.centsValue'));
        centsValue   = await centsValue[0].getText();

        store = await element.findElements(constants.By.css("div[class='cardFooter'] > a"));
        store = await store[0].getText();

        productPrice = store + ": " +  mainValue + centsValue;
        price.push(productPrice);
    
        return price;
    }
}

module.exports = BuscaPe;