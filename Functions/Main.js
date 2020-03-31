const BuscaPe = require('./BuscaPe');

class Main {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.buscaPe = new BuscaPe();
    }
}

async function StartExecution() {
    let main = new Main();
    let driver = await main.buscaPe.DriverStartUp(); 
    main.buscaPe.NavigateToBuscaPe(driver);
    main.buscaPe.MaximizeWindow(driver);
}

StartExecution();

