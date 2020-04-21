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
        
    }

    /** 
     * Retrieves all settings from .ini file
     * 
     * @returns {Object}
     */
    GetIniConfig()
    {
        let config = ini.parse(fs.readFileSync('C:\\TCC\\src\\data\\config.ini', 'ascii'));
        let result = {MainTag: config['CONFIGURATION']['MainTag'],
                      Pages: config['CONFIGURATION']['PagesToSearch']
                      };

        return result;
    }

    SetCurrentSearchStatus(totalOfProducts, currentProduct, currentPage) {
        let config = ini.parse(fs.readFileSync('C:\\TCC\\src\\data\\config.ini', 'ascii'));

        config.CONFIGURATION.TotalProductsInPage = totalOfProducts;
        config.CONFIGURATION.CurrentProduct = currentProduct;
        config.CONFIGURATION.CurrentPage = currentPage;

        fs.writeFileSync('C:\\TCC\\src\\data\\config.ini', ini.stringify(config, { section: '' }, 'ascii'));
    }

    SetEndOfProcess() { 
        setTimeout(() => {
            let config = ini.parse(fs.readFileSync('C:\\TCC\\src\\data\\config.ini', 'ascii'));

            config.CONFIGURATION.ProccessEnded = 'Yes';
            fs.writeFileSync('C:\\TCC\\src\\data\\config.ini', ini.stringify(config, { section: '' }, 'ascii'));
        }, 3000);
    }

    CheckExitStatus() {
        let config = ini.parse(fs.readFileSync('C:\\TCC\\src\\data\\config.ini', 'ascii'));
        let resultStatus = config['CONFIGURATION']['ExitProcess'];

        if (resultStatus == "Yes")
            return true;
        else
            return false;
    }
}

module.exports = IniHandler;