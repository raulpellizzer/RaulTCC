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
     * 
     * @param {String} Line the line we want to print in the terminal
     */
    PrintLine(Line) 
    {
        console.log(Line);
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

    GetIniConfig(iniSection, iniSectionTag, data)
    {
        // iniSection = [SECTION]
        // iniSectionTag = IniSectionTag=SomeTextGoesHere

        // Gets a piece of the main string (in this case, the whole file content)
        let test = data.substr(0,14);
        console.log(test);

        // Go through the file, caracter by caracter
        // for (let i = 0; i<data.length; i++) {
        //     console.log(data[i]);
        // }

    }

    Test()
    {
        //WORKS
        var string = "foo",
        substring = "oo";
        console.log(string.includes(substring));
    }

}

// Debug Section
const first = new TCC();
let fileContent = first.GetFileContentSync('C:/Users/raull/OneDrive/Área de Trabalho/Programação/TCC/Functions/config.ini', 'utf8');
// first.GetIniConfig('iniSection', 'iniSectionTag', fileContent)

// console.log(fileContent);

first.Test();


