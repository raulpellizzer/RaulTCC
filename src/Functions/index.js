const BuscaPe = require('./BuscaPe');
const IniHandler = require('./IniHandler');

class Main {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.buscaPe = new BuscaPe();
        this.iniHandler = new IniHandler();
        this.searchTags     = "";
        this.products       = "";
        this.totalProducts  = "";
    }

    async StartExecution() {
        try {
            this.buscaPe.ChromeDriverStartUp(); 
            await this.buscaPe.NavigateToBuscaPe();
            // await this.buscaPe.MaximizeWindow();
            await this.buscaPe.ScrollToBottom();
            this.searchTags = await this.iniHandler.GetIniConfig();

            await this.buscaPe.QueryItem(this.searchTags);
            this.products = await this.buscaPe.GetProducts();
            this.totalProducts = this.products.length
            await this.buscaPe.GetProductData(this.products[0]);
            

            

        } catch (error) {
            console.log(error);
        }
    }

}

let main = new Main();
main.StartExecution();

