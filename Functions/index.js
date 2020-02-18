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
     * Asyncronous function
     * 
     * @param {String} filePath the full file path
     * @param {String} encod the encoding of the output
     * @returns {String} data
     */
    // GetFileContent(filePath, encod)
    // {
    //     let fs = require('fs');
    //     fs.readFileSy(filePath, encod, (err, data) => {
    //         if (err) throw err
    //         return data; // USE CALLBACK/PROMISE INSTEAD
    //     });
    // }

    /**
     * Syncronous function
     * 
     * @param {String} filePath the full file path
     * @param {String} encod the encoding of the output
     * @returns {String} data
     */
    GetFileContentSync(filePath, encod)
    {
        let fs = require('fs');
        let data = fs.readFileSync(filePath, encod);

        return data;
    }

    /**
     * Retrieves the key 'iniSectionTag' from the section 'iniSection'
     * 
     * @param {String} iniSection - Section of .ini file
     * @param {String} iniSectionTag - Key of that section in .ini file
     * @returns {void}
     */
    GetIniConfig(iniSection, iniSectionTag)
    {
        var fs  = require('fs');
        var ini = require('ini');

        var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

        let result = config[iniSection][iniSectionTag];
        return result;
    }
}

// Debug Section
const robot = new TCC();
let result = robot.GetIniConfig('TAGS_PRODUCT', 'MainName'); // We have to find a way to make this dinamic, so that this doesnt get hard set in the code.

console.log('Done:')
console.log(result);

