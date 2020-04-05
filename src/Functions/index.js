const BuscaPe = require('./BuscaPe');
const IniHandler = require('./IniHandler');

class Main {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.buscaPe    = new BuscaPe();
        this.iniHandler = new IniHandler();
        this.searchTags = "";
        this.products   = "";
        this.data       = []; // Infos about each product (Name and Price)
    }

    /**
     * Main execution block
     * 
     * @returns
     */
    async StartExecution() {
        try {
            this.buscaPe.ChromeDriverStartUp(); 
            await this.buscaPe.NavigateToBuscaPe();
            // await this.buscaPe.MaximizeWindow();
            await this.buscaPe.ScrollToBottom();
            this.searchTags = await this.iniHandler.GetIniConfig();

            await this.buscaPe.QueryItem(this.searchTags);
            this.products = await this.buscaPe.GetProducts(); // Returns all elements, raw data

            for (let index = 0; index < this.products.length; index++) {
                this.data.push(await this.buscaPe.GetProductData(this.products[index]));
            }

            for (let index = 0; index < this.data.length; index++) {
                console.log(this.data[index].productName + " - " + this.data[index].productPrice);   
            }

            console.log("Fim!");
            

        } catch (error) {
            console.log(error);
        }
    }

}

let main = new Main();
main.StartExecution();

