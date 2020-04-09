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
        return this.driver;   
    }

    /**
     * Get the elements from the first page
     * 
     * @returns {WebElement} A web element from buscape
     */
    async GetProducts() {
        await this.driver.wait(constants.until.elementLocated(constants.By.css('div.cardBody > a'), 15000));
        let element = await this.driver.findElements(constants.By.css('div.cardBody > a'));
        return element;
    }

    /**
     * Retrieves data from an element
     * 
     * @param element - WebElement
     * @returns {Object} Object containing the product name and its main price, in buscape first page
     */
    async GetProductData() {
        try {
            let productName = await this.GetProductName();
            let productPrices = await this.GetProductPrices();

            let data = {productName, productPrices};

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
     * Retrieves the price of an element in buscape first page
     * 
     * @param element - WebElement
     * @returns {String} Product price
     */
    async GetProductPrices() {
        let prices = [];
        let elements = await this.driver.findElements(constants.By.css("span.price > span.price__total"));

        for (let index = 0; index < elements.length; index++) {
            prices.push(await elements[index].getText());
        }

        return prices;
    }

}

module.exports = BuscaPe;