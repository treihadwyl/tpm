/**
 * Treihadwyl Package Manager
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * @Command
 * tpm link
 *
 * @Desc
 * sugar around `npm link`
 *
 * @Use
 * `tpm link` - creates an `npm link` for the module currently in and adds it to
 * Treihadwyl core.
 *
 * @Use
 * 'tpm link package-name' - `npm link`s `package-name` to Treihadwyl core. Will
 * search sub-directories for `package-name`.
 */

var path = require( 'path' ),

    logger = require( '../utils/log' ),
    get = require( '../utils/promisify-fs' ).get,
    defConfig = require( '../../config.json' );

// Export command
module.exports = require( '../../' )
    .command( 'link' )
    .option( '-p, --package <path>', 'specify package to link' )
    .description( 'used to link a module to the core - in reality its just npm link sugar' )
    .action( link );


/**
 * Creates a symlink to the current project folder within core node_modules
 */
function link() {

    // Get the config
    var config = get( path.join( process.env.HOME, defConfig.installDir, 'config.json' ) )
                    .then( function( res ) {
                        console.log( 'got config file from .tpm' );
                    })
                    .catch( function( err ) {
                        console.log( 'error getting config file' );
                    });
}
