class TCC {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        const {Builder, By, Key, util, until} = require("selenium-webdriver");
        const chrome = require("selenium-webdriver/chrome");
        // const driver = new Builder().forBrowser("chrome").build();
    }

    /**
     * Handles the browser and the americanas website
     * 
     * @param {selenium driver} driver the webdriver
     */
    AmericanasHandler(driver)
    {
        driver.get("https://google.com.br");
        driver.manage().window().maximize();    
        driver.findElement(By.name("q")).sendKeys("Americanas.com.br", Key.ENTER);

        let initialLink = driver.wait(until.elementLocated(By.className('LC20lb'), 10000));
        initialLink.click();

        let americanasSearchBar = driver.wait(until.elementLocated(By.id('h_search-input'), 10000));
        americanasSearchBar.sendKeys("Headphones", Key.ENTER);

        setTimeout(() => {
            console.log("Continuing ..");
        }, 45000);
    }

    /**
     * Retrieves all settings from .ini file
     * 
     * @returns {Object}
     */
    GetIniConfig()
    {
        var fs  = require('fs');
        var ini = require('ini');
        var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

        let result = {MainTag: config['TAGS_PRODUCT']['MainTag'],
                    Tag1: config['TAGS_PRODUCT']['Tag1'],
                    Tag2: config['TAGS_PRODUCT']['Tag2'],
                    Tag3: config['TAGS_PRODUCT']['Tag3'],
                    Tag4: config['TAGS_PRODUCT']['Tag4'],
                    Tag5: config['TAGS_PRODUCT']['Tag5'],
                    Tag6: config['TAGS_PRODUCT']['Tag6'],
                    Tag7: config['TAGS_PRODUCT']['Tag7'],
                    Tag8: config['TAGS_PRODUCT']['Tag8'],
                    Tag9: config['TAGS_PRODUCT']['Tag9']};
        
        return result;
    }
}

// Debug Section
const robot = new TCC();
let result = robot.GetIniConfig();
console.log(result);
