const ChromeDriver = require('./ChromeDriver');
const constants = require('./consts');

class BuscaPe {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.chromeDriver = new ChromeDriver();
    }

    ChromeDriverStartUp() {
        this.driver = this.chromeDriver.DriverStartUp();
    }

    async NavigateToBuscaPe() {
        await this.driver.get('https://buscape.com.br');
        return this.driver;
    }

    async MaximizeWindow() {
        await this.driver.manage().window().maximize();
    }

    async ScrollToBottom() {
        await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
    }

    QueryItem(searchTags) {
        let buscaPeSearchBar = this.driver.wait(constants.until.elementLocated(constants.By.name('q'), 10000));  
        buscaPeSearchBar.sendKeys(searchTags.MainTag, constants.Key.ENTER);
        return this.driver;
        
    }

    async GetProducts() {
        let element = await this.driver.wait(constants.until.elementLocated(constants.By.css('div.cardBody > div.cardInfo > div > div > a.price > span > span.mainValue'), 15000));  
        element = await this.driver.findElements(constants.By.css('div.cardBody > div.cardInfo > div > div > a.price > span > span.mainValue'));

        return element;

        // let elementPromise = new Promise ((resolve, reject) => {
        //     var element = this.driver.wait(constants.until.elementLocated(constants.By.css('h1'), 10000));
        //     element = this.driver.findElements(constants.By.css('h1'));
            
        //     if (element.length) {
        //         resolve(element);
        //     } else
        //         reject("Zero elements found");
        // });

        // elementPromise
        //     .then((element) => {
        //         console.log("No then: " + element.length);
        //         // console.log("Text: " + element.getText);
        //         return element;
        //     })

        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    async Test() {
        let element = await document.getElementById("header");
        console.log("Total: " + element.length);

    }
    
}

module.exports = BuscaPe;