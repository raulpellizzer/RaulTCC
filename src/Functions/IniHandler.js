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
     * @returns {Object}
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
        }
    }
}

module.exports = IniHandler;