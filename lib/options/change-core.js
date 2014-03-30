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

    config = require( '../utils/config' ),
    logger = require( '../utils/log' );



module.exports = (function() {

    var corepath = process.argv[ 3 ];

    logger.log( !corepath ? 'Using current path as core directory' : 'Using specified path as core directory' );
    config
        .load()
        .then( function( conf ) {
            conf.coreDir = path.resolve( !corepath ? process.cwd() : process.argv[ 3 ] );
            return conf;
        })
        .then( config.save )
        .then( function() {
            logger.log( 'Core directory updated', chalk.green( '✔' ) );
        })
        .catch( function( err ) {
            logger.log( chalk.red( 'Error saving current path to config' ) );
        });
        
    return;

})();
