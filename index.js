"use strict";

const BuscaPe = require('./src/Functions/BuscaPe');
const IniHandler = require('./src/Functions/IniHandler');
const Report = require('./src/Functions/Report');

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
        this.configSetup  = "";
        this.products     = "";
        this.reportPath   = "";
    }

    /**
     * Main execution block
     * 
     * @returns
     */
    async MainExecution() {
        try {

            await this.Initialize();
            await this.QueryItem();

            for (let index = 0; index < this.configSetup.Pages; index++) {
                console.log("Reading page: " + (index + 1));
                await this.GetProducts();
                await this.RetrieveData();
                await this.GoToNextPage();
                await this.buscaPe.DriverSleep(5000);
            }
            
            await this.GenerateTXTReport();

            console.log("Done!");

        } catch (error) {
            console.log("Error: " + error);
        }
    }

    /**
     * Starts browser and gets configuration tags
     * 
     * @returns
     */
    async Initialize() {
        this.report.SetReportPath("C:\\TCC\\src\\data\\Search.txt");
        this.reportPath = this.report.GetReportPath();

        await this.buscaPe.ChromeDriverStartUp(); 
        await this.buscaPe.NavigateToBuscaPe();
        await this.buscaPe.MaximizeWindow();
        await this.buscaPe.ScrollToBottom();
        this.configSetup = await this.iniHandler.GetIniConfig();
    }

    /**
     * Searchs for the item in buscape
     * 
     * @returns
     */
    async QueryItem() {
        this.buscaPe.QueryItem(this.configSetup.MainTag);
    }

    /**
     * Retrieve main data
     * 
     * @returns
     */
    async GetProducts() {
        this.products = await this.buscaPe.GetProducts();
    }

    /**
     * Retrieve data about all products
     * 
     * @returns
     */
    async RetrieveData() {
        let productData = "";

        for (let index = 0; index < this.products.length; index++) {
            await this.buscaPe.DriverSleep(200);
            this.products = await this.buscaPe.GetProducts();
            let element = this.products[index];

            if (await element.getText() ==  "Ver preços") {
                await this.buscaPe.DriverSleep(200);
                await element.click();
                productData = await this.buscaPe.GetProductData(false, index); // error here
                await this.buscaPe.NavigateToPreviousPage();
                await this.buscaPe.DriverSleep(100);
            } else {
                productData = await this.buscaPe.GetProductData(true, index);
            }

            this.buscaPeData.push(productData);

        }
    }

    async GoToNextPage() {
        await this.buscaPe.NavigateToNextPage()
    }

    /**
     * Generates a .txt report file
     * 
     * @returns
     */
    async GenerateTXTReport() {
        for (let index = 0; index < this.buscaPeData.length; index++) {
            this.report.RegisterDataInFile(this.reportPath, this.buscaPeData[index].productName + "\n"); // error here
            for (let innerIndex = 0; innerIndex < this.buscaPeData[index].productPrices.length; innerIndex++) {
                if (this.buscaPeData[index].productPrices[innerIndex] == undefined)
                    continue;
                // let data = this.buscaPeData[index].productPrices[innerIndex].Store + ": " + this.buscaPeData[index].productPrices[innerIndex].Price + "\n";
                let data = this.buscaPeData[index].productPrices[innerIndex].Price + "\n";
                this.report.RegisterDataInFile(this.reportPath, data);
            }
            this.report.RegisterDataInFile(this.reportPath, "\n\n");
        }
    }
}

let main = new Main();
main.MainExecution();

