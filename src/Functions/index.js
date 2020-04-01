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
            this.buscaPe.NavigateToBuscaPe();
            this.buscaPe.NavigateToBuscaPe();
            this.buscaPe.MaximizeWindow();
            this.buscaPe.ScrollToBottom();

            let searchTags = await this.iniHandler.GetIniConfig();
            this.buscaPe.SearchItem(searchTags);


        } catch (error) {
            console.log(error);
        }
    }

}

let main = new Main();
main.StartExecution();

