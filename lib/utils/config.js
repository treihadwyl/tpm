/**
 * Treihadwyl Package Manager
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * Sugar for working with the config.
 */

var path = require( 'path' ),
    defConf = require( '../../config.json' ),
    get = require( './promisify-fs' ).get,
    write = require( './promisify-fs' ).write;

var configpath = path.join( process.env.HOME, defConf.installDir, 'config.json' );

module.exports = {

    /**
     * Wrapper around getting the config
     * ### returns {Promise}
     */
    load: function() {
        return get( configpath );
    },

    /**
     * Wrapper around saving the config
     * ### returns {Promise} empty promise ;(
     */
    save: function( data ) {
        return write( configpath, data );
    }
}
