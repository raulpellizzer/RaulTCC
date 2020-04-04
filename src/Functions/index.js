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
    }

    async StartExecution() {
        try {
            this.buscaPe.ChromeDriverStartUp(); 
            await this.buscaPe.NavigateToBuscaPe();
            // await this.buscaPe.MaximizeWindow();
            await this.buscaPe.ScrollToBottom();

            let searchTags = await this.iniHandler.GetIniConfig();
            await this.buscaPe.QueryItem(searchTags);
            let eleFound = await this.buscaPe.GetProducts();
            console.log(eleFound.length);
            
            // await eleFound[0].click(); // Click on the First element!

            

        } catch (error) {
            console.log(error);
        }
    }

}

let main = new Main();
main.StartExecution();

