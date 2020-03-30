class TCC {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        
    }

    /**
     * Handles the browser and the buscape website
     * 
     * @param {String} searchTags the tags that the robot will search for
     */
    BuscaPeHandler(searchTags)
    {
        const {Builder, By, Key, util, until} = require('selenium-webdriver');
        const chrome = require('selenium-webdriver/chrome');
        const driver = new Builder().forBrowser("chrome").build();

        driver.get('https://buscape.com.br');
        driver.manage().window().maximize();
        driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");

        let buscaPeSearchBar = driver.wait(until.elementLocated(By.name('q'), 10000));  
        buscaPeSearchBar.sendKeys(searchTags.MainTag, Key.ENTER);

        driver.wait(until.elementsLocated(By.css("span[class='mainValue']")));
        let elements = driver.findElements({css:"span[class*='mainValue']"});
        
        
        



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
var searchTags = robot.GetIniConfig();
robot.BuscaPeHandler(searchTags);