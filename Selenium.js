// https://selenium.dev/documentation/en/webdriver/browser_manipulation/

const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function myFunction() {
    let driver = await new Builder().forBrowser('chrome').build();
    chrome.setDefaultService(new chrome.ServiceBuilder('C:\\Users\\raull\\AppData\\Local\\Microsoft\\WindowsApps\\chromedriver.exe').build());
    await driver.get('https://google.com.br');

    // Estudo de Selenium WebDriver. Corrigir erros!
    
})().catch;