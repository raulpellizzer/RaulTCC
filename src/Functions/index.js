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
        main.buscaPe.ChromeDriverStartUp(); 
        this.buscaPe.NavigateToBuscaPe();
        this.buscaPe.MaximizeWindow();
        this.buscaPe.ScrollToBottom();

        let searchTags = this.iniHandler.GetIniConfig();
        console.log(searchTags);
        
        
    }

}

let main = new Main();
main.StartExecution();

