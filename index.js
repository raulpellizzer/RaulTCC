class TCC {

    constructor() {
        const fs = require('fs');

        const {Builder, By, Key, util, until} = require("selenium-webdriver");
        const chrome = require("selenium-webdriver/chrome");
        const driver = new Builder().forBrowser("chrome").build();
    }

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

    PrintLine() 
    {
        console.log('Reading file ..');
    }

    ReadFile(filePath, encod)
    {
        fs.readFile(filePath, encod, (err, data) => {
            if (err) throw err
            console.log(data);
        });
    }
}