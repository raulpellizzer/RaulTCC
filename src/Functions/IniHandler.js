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
        // FIX ERROR ???
        console.log("Cheguei aqui 1");
        let config = ini.parse(fs.readFileSync('./src/config.ini', 'utf-8'));
        console.log(typeof(config));
        console.log(config.length);

        let result = {MainTag: config['SETTINGS']['MainTag'],
                      Pages: config['SETTINGS']['PagesToSearch']
                      };
    
        console.log("Cheguei aqui 3");

        return result;
    }
}

module.exports = IniHandler;