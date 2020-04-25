"use strict";

const ChromeDriver  = require('./ChromeDriver');
const constants     = require('./consts');

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
    async ChromeDriverStartUp() {
        this.driver = await this.chromeDriver.DriverStartUp();
    }

    /**
     * Navigates to BuscaPe website
     */
    async NavigateToBuscaPe() {
        await this.driver.get('https://buscape.com.br');
    }

    /**
     * Navigate to previous page
     */
    async NavigateToPreviousPage() {
        await this.driver.navigate().back();
    }

    /**
     * Navigates to next page
     */
    async NavigateToNextPage() {
        try
        {
            let btnNext = await this.driver.findElements(constants.By.css("ul[class='ais-Pagination-list ais-Pagination'] > li[class='ais-Pagination-item ais-Pagination ais-Pagination ais-Pagination-item--nextPage'] > a[class='ais-Pagination-link ais-Pagination']"));
            
            if (btnNext.length > 0) {
                btnNext[0].click();
                return true;
            }
        }
        catch (error)
        {
            return false;
        }
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
        this.DriverSleep(500);
    }

    /**
     * Search for the specified tag in BuscaPe website
     * 
     * @param searchTags - String
     */
    QueryItem(searchTags) {
        try {
            let buscaPeSearchBar = this.driver.wait(constants.until.elementLocated(constants.By.name('q')), 60000);
            buscaPeSearchBar.sendKeys(searchTags, constants.Key.ENTER);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Get the elements from the first page
     * 
     * @returns {WebElement} A web element from buscape
     */
    async GetProducts() {
        try {
            var element = await this.driver.wait(constants.until.elementLocated(constants.By.css("div.cardBody > div.cardFooter > a[class*='Button']")), 60000);
            element = await this.driver.findElements(constants.By.css("div.cardBody > div.cardFooter > a[class*='Button']"));
        }

        finally {
            return element;
        }
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
                let productPrices = await this.GetProductPrices(); // ERROR AQUI
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

        await this.driver.wait(constants.until.elementLocated(constants.By.css("h1[class='product-name'] > span")), 60000);
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
        let finalData = "";

        let elements = await this.driver.findElements(constants.By.css("ul[class='offers-list'] > li"));
    
        for (let index = 0; index < elements.length; index++) {
            let prices = await elements[index].findElements(constants.By.css('div.r-cols > div.col-pricing.pricing > a > span.price > span.price__total'));
            
            // let store = await elements[index].findElements(constants.By.css('div.l-cols > div.col-store > a'));
            // let storeName = await store[0].getAttribute("alt");  // ERRO AQUI !!
            // let storeName = await store[0].getAttribute("title");
            // console.log("name: " + storeName);
            
            let storePrice = await prices[0].getText();

            finalData = {Price: storePrice};
            data.push(finalData);
        }

        data = await this.PrepareDataToOrdination(data);
        data = await this.OrdinateData(data);
        data = await this.ConsolidateData(data);

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
    
        await this.driver.wait(constants.until.elementLocated(constants.By.css('div.cardBody')), 60000);
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

        await this.driver.wait(constants.until.elementLocated(constants.By.css('div.cardBody')), 60000);
        element = await this.driver.findElements(constants.By.css('div.cardBody'));
        element = element[index];

        productPrice = await element.findElements(constants.By.css('div.cardInfo > div > div > a.price > span'));
        mainValue    = await productPrice[0].findElements(constants.By.css('span.mainValue'));
        mainValue    = await mainValue[0].getText();
    
        centsValue   = await productPrice[0].findElements(constants.By.css('span.centsValue'));
        centsValue   = await centsValue[0].getText();

        store = await element.findElements(constants.By.css("div[class='cardFooter'] > a"));
        store = await store[0].getText();
        
        productPrice = {Store: store, Price: (mainValue + centsValue)}
        price.push(productPrice);
    
        return price;
    }

    /**
     * Prepares the string for ordination
     * 
     * @param data - Array containing the store name and its prices
     * @returns {Array} 
     */
    PrepareDataToOrdination(data) {
        for (let index = 0; index < data.length; index++) {
            let temp = data[index].Price;
    
            temp = temp.split(" ");
            temp = temp[1];
    
            temp = temp.split(",");
            temp = temp[0] + temp[1];

            
            temp = temp.split(".");
            if (temp.length > 1)
                temp = temp[0] + temp[1];
    
            data[index].Price = temp;
        }
        
        return data;
    }
            
    /**
     * Ordinates data by its price
     * 
     * @param data - Array containing the store name and its prices
     * @returns {Array} 
     */
    OrdinateData(data) {
        return data.sort(function ordenateData(a, b) {
            return a.Price - b.Price;
        });
    }

    /**
     * Builds the full string again
     * 
     * @param data - Array containing the store name and its prices
     * @returns {Array} 
     */
    ConsolidateData(data) {
        for (let index = 0; index < data.length; index++) {
            let price = data[index].Price.toString();
            switch (price.length) {

                case 10:
                    price = "R$ " + price[0] + price[1] + "." + price[2] + price[3] + price[4] + "." + price[5] + price[6] + price[7] + "." + price[8] + price[9]; 
                    break;
                
                case 9:
                    price = "R$ " + price[0] + "." + price[1] + price[2] + price[3] + "." + price[4] + price[5] + price[6] + "." + price[7] + price[8]; 
                    break;
            
                case 8:
                    price = "R$ " + price[0] + price[1] + price[2] + "." + price[3] + price[4] + price[5] + "." + price[6] + price[7];
                    break;
            
                case 7:
                    price = "R$ " + price[0] + price[1] + "." + price[2] + price[3] + price[4] + "." + price[5] + price[6];
                    break;
                
                case 6:
                    price = "R$ " + price[0] + "." + price[1] + price[2] + price[3] + "." + price[4] + price[5];
                    break;
            
                case 5:
                    price = "R$ " + price[0] + price[1] + price[2] + "." + price[3] + price[4];
                    break;
            
                case 4:
                    price = "R$ " + price[0] + price[1] + "." + price[2] + price[3];
                    break;
                
                case 3:
                    price = "R$ " + price[0] + "." + price[1] + price[2];
                    break;
            
                default:
                    break;
            }
            
            data[index].Price = price;
        }

        return data;
    }
}

module.exports = BuscaPe;