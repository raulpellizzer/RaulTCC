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
        let config = ini.parse(fs.readFileSync('./src/config.ini', 'utf-8'));
        let result = {MainTag: config['SETTINGS']['MainTag'],
                      Pages: config['SETTINGS']['PagesToSearch']
                      };

        return result;
    }
}

module.exports = IniHandler;