"use strict";

const fs  = require('fs');
const ini = require('ini');

class IniHandler {

    /**
     * Class constructor
     * 
     * @constructor
     */
    constructor() {
        this.errorPath = 'C:\\TCC\\src\\data\\errors.txt';
    }

    /** 
     * Retrieves all settings from .ini file
     * 
     * @returns {Object}
     */
    GetIniConfig()
    {
        try {
            let config = ini.parse(fs.readFileSync('C:\\TCC\\src\\data\\config.ini', 'ascii'));
            let result = {MainTag: config['CONFIGURATION']['MainTag'],
                        Pages: config['CONFIGURATION']['PagesToSearch']
                        };

            return result;
        } catch (error) {
            fs.appendFileSync(this.errorPath, error);
        }
    }

    SetCurrentSearchStatus(totalOfProducts, currentProduct, currentPage) {
        try {
            let config = ini.parse(fs.readFileSync('C:\\TCC\\src\\data\\config.ini', 'ascii'));

            config.CONFIGURATION.TotalProductsInPage = totalOfProducts;
            config.CONFIGURATION.CurrentProduct = currentProduct;
            config.CONFIGURATION.CurrentPage = currentPage;

            fs.writeFileSync('C:\\TCC\\src\\data\\config.ini', ini.stringify(config, { section: '' }, 'ascii'));
        } catch (error) {
            fs.appendFileSync(this.errorPath, error);
        }
    }

    SetEndOfProcess() { 
        try {
            setTimeout(() => {
                let config = ini.parse(fs.readFileSync('C:\\TCC\\src\\data\\config.ini', 'ascii'));
    
                config.CONFIGURATION.ProccessEnded = 'Yes';
                fs.writeFileSync('C:\\TCC\\src\\data\\config.ini', ini.stringify(config, { section: '' }, 'ascii'));
            }, 3000);
        } catch (error) {
            fs.appendFileSync(this.errorPath, error);
        }
    }

    CheckExitStatus() {
        try {
            let config = ini.parse(fs.readFileSync('C:\\TCC\\src\\data\\config.ini', 'ascii'));
            let resultStatus = config['CONFIGURATION']['ExitProcess'];

            if (resultStatus == "Yes")
                return true;
            else
                return false;
        } catch (error) {
            fs.appendFileSync(this.errorPath, error);
        }
    }
}

module.exports = IniHandler;