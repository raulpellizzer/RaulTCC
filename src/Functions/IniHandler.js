"use strict";

const fs           = require('fs');
const ini          = require('ini');
const ErrorHandler = require('./ErrorHandler');
const constants    = require('./consts');

class IniHandler {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.errorHandler = new ErrorHandler();
    }

    /** 
     * Retrieves all settings from .ini file
     * 
     * @returns {Object} Query data for the search
     */
    GetIniConfig()
    {
        try {
            let config = ini.parse(fs.readFileSync(constants.configPath, 'ascii'));
            let result = {MainTag: config['CONFIGURATION']['MainTag'],
                        Pages: config['CONFIGURATION']['PagesToSearch']
                        };

            return result;
        } catch (error) {
            this.errorHandler.ErrorMessageLog(error);
        }
    }

    /** 
     * Retrieves the report type
     * 
     * @returns {String} Report type
     */
    GetReportType()
    {
        try {
            let config = ini.parse(fs.readFileSync(constants.configPath, 'ascii'));
            return config['CONFIGURATION']['ReportType'];
        } catch (error) {
            this.errorHandler.ErrorMessageLog(error);
        }
    }

    /** 
     * Set the current status (step) of the search
     * 
     * @param totalOfProducts integer - The total of products in the current page
     * @param currentProduct integer - The current product
     * @param currentPage integer - The current page
     */
    SetCurrentSearchStatus(totalOfProducts, currentProduct, currentPage) {
        try {
            let config = ini.parse(fs.readFileSync(constants.configPath, 'ascii'));

            config.CONFIGURATION.TotalProductsInPage = totalOfProducts;
            config.CONFIGURATION.CurrentProduct = currentProduct;
            config.CONFIGURATION.CurrentPage = currentPage;

            fs.writeFileSync(constants.configPath, ini.stringify(config, { section: '' }, 'ascii'));
        } catch (error) {
            this.errorHandler.ErrorMessageLog(error);
        }
    }

    /** 
     * Sets the end of the proccess
     * 
     */
    SetEndOfProcess() { 
        try {
            setTimeout(() => {
                let config = ini.parse(fs.readFileSync(constants.configPath, 'ascii'));
    
                config.CONFIGURATION.ProccessEnded = 'Yes';
                fs.writeFileSync(constants.configPath, ini.stringify(config, { section: '' }, 'ascii'));
            }, 3000);
        } catch (error) {
            this.errorHandler.ErrorMessageLog(error);
        }
    }

    /** 
     * Verify the exit status
     * 
     * @returns Boolean
     */
    CheckExitStatus() {
        try {
            let config = ini.parse(fs.readFileSync(constants.configPath, 'ascii'));
            let resultStatus = config['CONFIGURATION']['ExitProcess'];

            if (resultStatus == "Yes")
                return true;
            else
                return false;
        } catch (error) {
            this.errorHandler.ErrorMessageLog(error);
            return false;
        }
    }
}

module.exports = IniHandler;