/**
 * Treihadwyl Package Manager
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * Grabs and writes to the modules json file.
 */

var path = require( 'path' ),
    Promise = require( 'es6-promise' ).Promise,

    defConf = require( '../../config.json' ),
    get = require( './promisify-fs' ).get,
    write = require( './promisify-fs' ).write,
    logger = require( './log' );

var modulepath = path.join( process.env.HOME, defConf.installDir, 'modules.json' );

module.exports = {

    /**
     * Wrapper around getting the modules file
     * ### returns {Promise}
     */
    load: function() {
        return new Promise( function( resolve, reject ) {
            get( modulepath )
                .then( resolve )
                .catch( function( err ) {
                    // @todo - this handles the error but it is also handled in promisify-fs.js so
                    // the error message is output before this 'Creating modules.json' message
                    if ( err.code = 'ENOENT' ) {
                        logger.log( 'Creating modules.json' );
                        var data = {};
                        write( modulepath, data );
                        resolve( JSON.stringify( data ) );
                        return;
                    }

                    reject( err );
                });
        });
    },

    /**
     * Wrapper around saving the modules file
     * ### returns {Promise} empty promise ;(
     */
    save: function( data ) {
        return write( modulepath, data );
    }
}
