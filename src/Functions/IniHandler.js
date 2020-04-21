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

        fs.writeFileSync('C:\\TCC\\src\\data\\config.ini', ini.stringify(config, { section: '' }, 'ascii'))
    }

    SetEndOfProcess() {
        let config = ini.parse(fs.readFileSync('C:\\TCC\\src\\data\\config.ini', 'ascii'));

        config.CONFIGURATION.ProccessEnded = 'Yes';
        fs.writeFileSync('C:\\TCC\\src\\data\\config.ini', ini.stringify(config, { section: '' }, 'ascii'))
    }
}

module.exports = IniHandler;