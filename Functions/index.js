class TCC {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        
    }

    /**
     * Handles the browser and the americanas website
     * 
     * @param {String} searchTags the tags that the robot will search for
     */
    AmericanasHandler(searchTags)
    {
        const {Builder, By, Key, util, until} = require('selenium-webdriver');
        const chrome = require('selenium-webdriver/chrome');
        const driver = new Builder().forBrowser("chrome").build();

        driver.get('https://google.com.br');
        driver.manage().window().maximize();    
        driver.findElement(By.name('q')).sendKeys('Americanas.com.br', Key.ENTER);

        let americanasLink = driver.wait(until.elementLocated(By.className('LC20lb'), 10000));
        americanasLink.click();

        let americanasSearchBar = driver.wait(until.elementLocated(By.id('h_search-input'), 10000));

        // Define here the tag that we want to use. Later, iterate through all tags
        americanasSearchBar.sendKeys(searchTags.MainTag, Key.ENTER);

        // Study how to correctly implement Promises and how to handle them
        setTimeout(() => {
            try {
                let totalElements = 0;
                totalElements = driver.findElements(By.css("div[class*='product-card-photo']").length); // Works? Perform tests
                console.log(totalElements);
                
            } catch (e) {
                console.log(e);
            }

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
var searchTags = robot.GetIniConfig(); // Fully working

robot.AmericanasHandler(searchTags);