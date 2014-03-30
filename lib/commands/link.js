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


// @todo currently just creates a symlink from the current or specified folder,
// really, that link should search for a valid package.json and then use the name
// of the package (rather than the folder) to create the symlink from the folder
// that houses the package.


var path = require( 'path' ),

    chalk = require( 'chalk' ),

    tpm = require( '../../' ),
    logger = require( '../utils/log' ),
    symlink = require( '../utils/promisify-fs' ).symlink,
    config = require( '../utils/config' );

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

    var packagepath = typeof tpm.args[ 0 ].package === 'undefined' ? process.cwd() : path.resolve( tpm.args[ 0 ].package );

    logger.log( 'Creating link', chalk.cyan( path.basename( packagepath ) ) );

    // Get the config
    config
        .load()
        .then( function( res ) {
            return symlink(
                path.join( packagepath ),
                path.join( res.coreDir, 'node_modules/', path.basename( packagepath ) )
            );
        })
        .then( function() {
            logger.log( 'Link created', chalk.green( '✔' ) );
        })
        .catch( function( err ) {
            logger.log( chalk.red( 'Error creating link' ) );
        });
}
