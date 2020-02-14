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
     * 
     * @param {String} filePath the full file path
     * @param {String} encod the encoding of the output
     */
    ReadFile(filePath, encod)
    {
        let fs = require('fs');
        fs.readFile(filePath, encod, (err, data) => {
            if (err) throw err
            console.log(data);
        });
    }
}

const first = new TCC();

first.PrintLine('Learning how to properly program with NodeJs!');

setTimeout(() => {
    first.PrintLine('File content:');
    first.ReadFile('C:/Users/raull/OneDrive/Área de Trabalho/Programação/TCC/Functions/config.ini', 'utf8');
}, 3000);
