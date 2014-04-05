/**
 * Treihadwyl Package Manager
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * @Command
 * tpm create
 *
 * @Desc
 * creates a new module
 *
 * @Use
 * `tpm register` - registers the package at the current path, best to run this from the project root
 */

var path = require( 'path' ),

    Promise = require( 'es6-promise' ).Promise,
    extend = require( 'lodash-node/modern/objects/assign' ),
    chalk = require( 'chalk' ),

    logger = require( '../utils/log' ),
    config = require( '../utils/config' ),
    modules = require( '../utils/modules' ),
    get = require( '../utils/promisify-fs' ).get;


// Export command
module.exports = require( '../../' )
    .command( 'register' )
    .description( 'registers a package' )
    .action( register );


var conf = null,
    mod = null;


function register() {

    logger.log( 'registering module' );

    Promise.all([
        config.load(),
        modules.load()
    ])
        .then( function( res ) {
            conf = res[ 0 ];
            mod = res[ 1 ];
        })
        .then( getPkg )
        .then( function( pkg ) {
            mod[ pkg.name ] = path.resolve( process.cwd() );
            modules.save( mod );
        })
        .then( function() {
            logger.log( 'Module registered', chalk.green( '✔' ) );
        })
        .catch( function( err ) {
            logger.log( chalk.red( 'error registering module:', err ) );
        });
}


function getPkg() {
    return get( './package.json' )
        .catch( function( err ) {
            logger.log( chalk.red( 'error:' ), 'can not find package.json' );
            logger.log( chalk.yellow( 'try running' ), chalk.cyan( 'register' ), chalk.yellow( 'from project root' ) );
        });
}
