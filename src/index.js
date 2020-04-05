const BuscaPe = require('./Functions/BuscaPe');
const IniHandler = require('./Functions/IniHandler');
const Report = require('./Functions/Report');

class Main {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.buscaPe    = new BuscaPe();
        this.iniHandler = new IniHandler();
        this.report     = new Report();
        this.data       = []; // Infos about each product (Name and Price)
        this.searchTags = "";
        this.products   = "";
        this.reportPath = "";
    }

    /**
     * Main execution block
     * 
     * @returns
     */
    async StartExecution() {
        try {
            this.report.SetReportPath(__dirname + "\\data\\Search.txt");
            this.reportPath = this.report.GetReportPath();

            this.buscaPe.ChromeDriverStartUp(); 
            await this.buscaPe.NavigateToBuscaPe();
            // await this.buscaPe.MaximizeWindow();
            await this.buscaPe.ScrollToBottom();
            this.searchTags = await this.iniHandler.GetIniConfig();

            await this.buscaPe.QueryItem(this.searchTags);
            this.products = await this.buscaPe.GetProducts(); // Returns all elements, raw data

            for (let index = 0; index < this.products.length; index++)
                this.data.push(await this.buscaPe.GetProductData(this.products[index]));

            for (let index = 0; index < this.data.length; index++) {
                let dataToAppend = this.data[index].productName + " - " + this.data[index].productPrice + "\n";
                this.report.RegisterDataInFile(this.reportPath, dataToAppend);
            }

            console.log("Done!");

        } catch (error) {
            console.log(error);
        }
    }

}

let main = new Main();
main.StartExecution();

