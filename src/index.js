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
        this.buscaPe      = new BuscaPe();
        this.iniHandler   = new IniHandler();
        this.report       = new Report();
        this.buscaPeData  = [];
        this.searchTags   = "";
        this.products     = "";
        this.reportPath   = "";
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
            await this.buscaPe.MaximizeWindow();
            await this.buscaPe.ScrollToBottom();
            this.searchTags = await this.iniHandler.GetIniConfig();

            await this.buscaPe.QueryItem(this.searchTags);
            this.products = await this.buscaPe.GetProducts();

            for (let index = 0; index < this.products.length; index++) {
                await this.buscaPe.DriverSleep(200);
                this.products = await this.buscaPe.GetProducts();
                let element = this.products[index];

                if (await element.getText() ==  "Ver preços") {
                    await element.click();

                    let productData = await this.buscaPe.GetProductData(false, index);
                    this.buscaPeData.push(productData);

                    await this.buscaPe.NavigateToPreviousPage();
                    await this.buscaPe.DriverSleep(100);
                } else {
                    let productData = await this.buscaPe.GetProductData(true, index);
                    this.buscaPeData.push(productData);
                }
            }

            for (let index = 0; index < this.buscaPeData.length; index++) { 
                this.report.RegisterDataInFile(this.reportPath, this.buscaPeData[index].productName + "\n");
                for (let innerIndex = 0; innerIndex < this.buscaPeData[index].productPrices.length; innerIndex++) {
                    if (this.buscaPeData[index].productPrices[innerIndex] == undefined)
                        continue;
                    this.report.RegisterDataInFile(this.reportPath, this.buscaPeData[index].productPrices[innerIndex] + "\n");
                }
                this.report.RegisterDataInFile(this.reportPath, "\n\n");
            }

            console.log("Done!");

        } catch (error) {
            console.log(error);
        }
    }

}

let main = new Main();
main.StartExecution();

