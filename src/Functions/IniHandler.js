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
        var fs  = require('fs');
        var ini = require('ini');
        var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

        let result = {MainTag: config['TAGS_PRODUCT']['MainTag'],
                    Tag1: config['TAGS_PRODUCT']['Tag1'],
                    Tag2: config['TAGS_PRODUCT']['Tag2'],
                    Tag3: config['TAGS_PRODUCT']['Tag3'],
                    Tag4: config['TAGS_PRODUCT']['Tag4'],
                    Tag5: config['TAGS_PRODUCT']['Tag5'],
                    Tag6: config['TAGS_PRODUCT']['Tag6'],
                    Tag7: config['TAGS_PRODUCT']['Tag7'],
                    Tag8: config['TAGS_PRODUCT']['Tag8'],
                    Tag9: config['TAGS_PRODUCT']['Tag9']};

        return result;
    }
}

module.exports = IniHandler;