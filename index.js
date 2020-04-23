"use strict";

const BuscaPe      = require('./src/Functions/BuscaPe');
const IniHandler   = require('./src/Functions/IniHandler');
const Report       = require('./src/Functions/Report');
const ErrorHandler = require('./src/Functions/ErrorHandler');
const constants    = require('./src/Functions/consts');

class Main {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.errorHandler = new ErrorHandler();
        this.iniHandler   = new IniHandler();
        this.buscaPe      = new BuscaPe();
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
        var currentPage  = "";

        try {
            let exitProccess = "";

            await this.Initialize();
            await this.QueryItem();

            for (let index = 0; index < this.configSetup.Pages; index++) {
                currentPage = index + 1;

                console.log("Reading page: " + (index + 1));
                await this.GetBuscaPeProducts();

                if (this.products != undefined) {
                    exitProccess = await this.RetrieveData(currentPage);
                    if (exitProccess)
                        break;

                    let nextPage = await this.GoToNextPage();
                    if (!nextPage)
                        break;

                    await this.buscaPe.DriverSleep(8000);
                } else
                    this.errorHandler.LogError(this.configSetup.MainTag);
            }

            console.log("Aqui 1");
            await this.iniHandler.SetEndOfProcess();
            console.log("Aqui 2");
            await this.GenerateTXTReport(currentPage);
            console.log("Aqui 3");
            console.log("The process has ended!");
            
            return
        } catch (error) {
            console.log(error);
            this.errorHandler.ErrorMessageLog(error);
            console.log("Aqui 4");
            this.errorHandler.LogError(this.configSetup.MainTag);
            console.log("Aqui 5");
            await this.iniHandler.SetEndOfProcess();
            console.log("Aqui 6");
            await this.GenerateTXTReport(currentPage);
            console.log("Aqui 7");
            return
        }
    }

    /**
     * Starts browser and gets configuration tags
     * 
     * @returns
     */
    async Initialize() {
        this.report.SetReportPath(constants.reportPath);

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
    async GetBuscaPeProducts() {
        this.products = await this.buscaPe.GetProducts();
    }

    /**
     * Retrieve data about all products
     * 
     * @returns
     */
    async RetrieveData(currentPage) {
        let productData = "";
        let exitStatus  = "";

        for (let index = 0; index < this.products.length; index++) {
            await this.iniHandler.SetCurrentSearchStatus(this.products.length, index, currentPage);

            await this.buscaPe.DriverSleep(200);
            this.products = await this.buscaPe.GetProducts();
            let element = this.products[index];

            if (await element.getText() ==  "Ver preços") {
                await this.buscaPe.DriverSleep(200);

                try {
                    await element.click();
                    productData = await this.buscaPe.GetProductData(false, index);
                    await this.buscaPe.NavigateToPreviousPage();
                    await this.buscaPe.DriverSleep(100);
                } catch (error) {
                    let productName = "Error when retrieving product " + index;
                    productData = {productName: productName, productPrices: "None"};
                }

            } else {
                productData = await this.buscaPe.GetProductData(true, index);
            }

            this.buscaPeData.push(productData);
            exitStatus = this.iniHandler.CheckExitStatus();

            if (exitStatus)
                return true;
        }
    }

    async GoToNextPage() {
        let res = await this.buscaPe.NavigateToNextPage();
        return res;
    }

    /**
     * Generates a .txt report file
     * 
     * @returns
     */
    async GenerateTXTReport(currentPage) {
        let reportHeader = await this.report.BuildReportInfos(this.configSetup.MainTag, this.configSetup.Pages, currentPage, this.buscaPeData.length);
        this.report.RegisterDataInFile(this.report.reportPath, reportHeader);

        for (let index = 0; index < this.buscaPeData.length; index++) {
            this.report.RegisterDataInFile(this.report.reportPath, this.buscaPeData[index].productName + "\n");
            for (let innerIndex = 0; innerIndex < this.buscaPeData[index].productPrices.length; innerIndex++) {
                if (this.buscaPeData[index].productPrices[innerIndex] == undefined)
                    continue;
                let data = this.buscaPeData[index].productPrices[innerIndex].Price + "\n";
                this.report.RegisterDataInFile(this.report.reportPath, data);
            }
            this.report.RegisterDataInFile(this.report.reportPath, "\n\n");
        }
    }
}

let main = new Main();
main.MainExecution();

