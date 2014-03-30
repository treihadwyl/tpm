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
 * `tpm create <path>` - creates a new package at <path>
 */


var path = require( 'path' ),

    shell = require( 'shelljs' ),
    chalk = require( 'chalk' ),
    Promise = require( 'es6-promise' ).Promise,

    logger = require( '../utils/log' ),
    config = require( '../utils/config' );



// Export command
module.exports = require( '../../' )
    .command( 'create <name>' )
    .description( 'scaffolds a new package' )
    .action( create );

var self = {};


function create() {

    self.name = this.args[ 0 ];

    config
        .load()
        .then( clone )
        .then( install )
        .catch( function( err ) {
            logger.log( chalk.red( 'error creating scaffold', err ) );
        });
}

function clone( res ) {
    return new Promise( function( resolve, reject ) {

        if ( !res.scaffoldURL ) {
            logger.log( chalk.red( 'Error:', 'scaffold url not specified in config' ) );
            // reject();
            return;
        }

        var clone = shell.exec( 'git clone ' + res.scaffoldURL + ' ' + self.name, { async: true, silent: true } );
        clone.stdout.on( 'data', logger.log );
        // Git clone seems to prefer stderr for some reason
        clone.stderr.on( 'data', logger.log );

        clone.on( 'error', function( err ) {
                // Git clone doesnt tend to throw errors, using stderr to broadcast them instead
                logger.log( chalk.red( 'Error cloning scaffold', err ) );
                reject();
            })
            .on( 'close', function( code ) {
                if ( code > 0 ) {
                    logger.log( 'Scaffold clone failure', chalk.red( '✗' ) );
                    reject();
                    return;
                }

                logger.log( 'Scaffold clone successful', chalk.green( '✔' ) );
                resolve( this );
            });
    });
}


function install() {
    return new Promise( function( resolve, reject ) {

        logger.log( 'Running', chalk.yellow( 'npm' ), 'install' );

        var install = shell.exec( 'cd ' + self.name + ' && ' + 'npm install', { async: true, silent: true } );
        // npm is noisy
        // @todo sanitize this output
        // install.stdout.on( 'data', logger.log );
        // install.stderr.on( 'data', logger.log );

        install.on( 'error', function( err ) {
                logger.log( chalk.red( 'Error installing dependencies from npm', err ) );
                reject();
            })
            .on( 'close', function( code ) {
                if ( code > 0 ) {
                    logger.log( 'Npm install failure', chalk.red( '✗' ) );
                    reject();
                    return;
                }

                logger.log( 'Npm install successful', chalk.green( '✔' ) );
                resolve( this );
            });
    });
}
