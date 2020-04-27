"use strict";

const BuscaPe      = require('./src/Functions/BuscaPe');
const IniHandler   = require('./src/Functions/IniHandler');
const Report       = require('./src/Functions/Report');
const ErrorHandler = require('./src/Functions/ErrorHandler');
const constants    = require('./src/Functions/consts');
const Excel        = require('./src/Functions/Excel');

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
        this.excel        = new Excel();
        this.buscaPeData  = [];
        this.configSetup  = "";
        this.products     = "";
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

                await this.GetBuscaPeProducts();
                if (this.products != undefined && this.products.length > 0) {
                    exitProccess = await this.RetrieveData(currentPage);
                    if (exitProccess)
                        break;

                    let nextPage = await this.GoToNextPage();
                    if (!nextPage)
                        break;

                    await this.buscaPe.DriverSleep(8000);
                } else
                    this.errorHandler.ErrorMessageLog('[MAIN] No results were found for: ' + this.configSetup.MainTag);
            }

            await this.iniHandler.SetEndOfProcess();
            await this.GenerateReport(currentPage);

            return
        } catch (error) {
            this.errorHandler.ErrorMessageLog('Main execution: ' + error);
            await this.iniHandler.SetEndOfProcess();
            await this.GenerateReport(currentPage);
            return
        }
    }

    /**
     * Starts browser and gets configuration tags
     * 
     */
    async Initialize() {
        this.report.SetTXTReportPath(constants.txtReportPath);

        await this.buscaPe.ChromeDriverStartUp(); 
        await this.buscaPe.NavigateToBuscaPe();
        await this.buscaPe.MaximizeWindow();
        await this.buscaPe.ScrollToBottom();
        this.configSetup = await this.iniHandler.GetIniConfig();
    }

    /**
     * Searchs for the item in buscape
     * 
     */
    async QueryItem() {
        let querySuccess = this.buscaPe.QueryItem(this.configSetup.MainTag);

        while (!querySuccess)
            querySuccess = this.buscaPe.QueryItem(this.configSetup.MainTag);
    }

    /**
     * Get the products from the page
     * 
     */
    async GetBuscaPeProducts() {
        this.products = await this.buscaPe.GetProducts();
    }

    /**
     * Retrieve data from the products of the current page
     * 
     * @param currentPage integer
     * @returns Boolean
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

            } else
                productData = await this.buscaPe.GetProductData(true, index);

            this.buscaPeData.push(productData);
            exitStatus = this.iniHandler.CheckExitStatus();

            if (exitStatus)
                return true;
        }
    }

    /**
     * Navigate to next page in Buscape
     * 
     * @returns Boolean
     */
    async GoToNextPage() {
        let res = await this.buscaPe.NavigateToNextPage();
        return res;
    }

    /**
     * Generates the final report
     * 
     * @param currentPage integer
     */
    async GenerateReport(currentPage) {
        let reportType = await this.iniHandler.GetReportType();

        if (reportType == 'Text')
            await this.GenerateTXTReport(currentPage);
        else
            await this.GenerateCsvReport();
    }

    /**
     * Generates the excel .csv report
     * 
     */
    async GenerateCsvReport() {
        await this.excel.GenerateExcelReport(this.buscaPeData);
    }

    /**
     * Generates a .txt report file
     * 
     * @param currentPage integer
     */
    async GenerateTXTReport(currentPage) {
        let reportHeader = await this.report.BuildTXTReportInfos(this.configSetup.MainTag, this.configSetup.Pages, currentPage, this.buscaPeData.length);
        this.report.RegisterDataInTXTFile(this.report.txtReportPath, reportHeader);

        for (let index = 0; index < this.buscaPeData.length; index++) {
            this.report.RegisterDataInTXTFile(this.report.txtReportPath, this.buscaPeData[index].productName + "\n");
            for (let innerIndex = 0; innerIndex < this.buscaPeData[index].productPrices.length; innerIndex++) {
                if (this.buscaPeData[index].productPrices[innerIndex] == undefined)
                    continue;
                let data = this.buscaPeData[index].productPrices[innerIndex].Price + "\n";
                this.report.RegisterDataInTXTFile(this.report.txtReportPath, data);
            }
            this.report.RegisterDataInTXTFile(this.report.txtReportPath, "\n\n");
        }
    }
}

let main = new Main();
main.MainExecution();

