/**
 * Treihadwyl Package Manager
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * @Command
 * tpm -c path
 *
 * @Desc
 * choose a new core package directory to link to
 *
 * @Use
 * `tpm -c path` - stores a new core package location
 */

var path = require( 'path' ),
    chalk = require( 'chalk' ),
    logger = require( '../utils/log' );

module.exports = (function() {

    var corepath = process.argv[ 3 ];

    if ( !corepath ) {
        logger.log( 'Using current path as core directory' );
        return
    }

    logger.log( 'Using specified path as core directory' );
    logger.log( corepath );

})();
