const {Builder, By, Key, util, until} = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const driver = new Builder().forBrowser("chrome").build();

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


