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
            console.log("FUNC 01");
            let config = ini.parse(fs.readFileSync('C:\\TCC\\src\\data\\config.ini', 'ascii'));
            console.log("FUNC 02");

            config.CONFIGURATION.ProccessEnded = 'Yes';
            console.log("FUNC 03");
            fs.writeFileSync('C:\\TCC\\src\\data\\config.ini', ini.stringify(config, { section: '' }, 'ascii'));
            console.log("FUNC 04");
        }, 3000);
    }
}

module.exports = IniHandler;