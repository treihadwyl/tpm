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
    config = require( '../utils/config' ),
    file = require( '../utils/promisify-fs' );



// Export command
module.exports = require( '../../' )
    .command( 'create <name>' )
    .description( 'scaffolds a new package' )
    .action( create );

var self = {};


/**
 * Gathers some info for the new module and starts the process off
 */
function create() {

    self.name = this.args[ 0 ];
    self.cwd = process.cwd();

    logger.log( 'Short description for package:' );
    logger.prompt()
        .then( function( res ) {
            self.desc = res;
            logger.log( 'Author:' );
        })
        .then( logger.prompt )
        .then( function( res ) {
            self.author = res;
            logger.log( 'Creating new package...' );
        })
        .then( start )
        .catch( function( err ) {
            logger.log( chalk.red( 'error getting input for scaffolding' ) );
            final();
        });
}


/**
 * Kickstarts cloning and initialising the new module
 */
function start() {

    config
        .load()
        .then( clone )
        .then( install )
        .then( personalise )
        .then( function() {
            logger.log( 'New module created' );
            final();
        })
        .catch( function( err ) {
            logger.log( chalk.red( 'error creating scaffold', err ) );
            final();
        });
}


/**
 * Just moves the current working directory back to its original position
 */
function final() {
    shell.cd( self.cwd );
}


/**
 * Runs git clone to grab the base repo
 */
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


/**
 * Runs npm install to grab dependencies
 */
function install() {
    return new Promise( function( resolve, reject ) {

        logger.log( 'Running', chalk.yellow( 'npm' ), 'install' );

        shell.cd( self.name );
        var install = shell.exec( 'npm install', { async: true, silent: true } );
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


/**
 * Uses info collected earlier to alter the package.json and other stuff specific
 * to this new package
 */
function personalise() {
    return new Promise( function( resolve, reject ) {

        logger.log( 'Setting package info' );

        file.get( 'package.json' )
            .then( function( pkg ) {
                pkg.name = self.name;
                pkg.author = self.author;
                pkg.description = self.desc;
                return pkg;
            })
            .then( function( pkg ) {
                file.write( 'package.json', pkg );
            })
            .then( function() {
                logger.log( chalk.yellow( 'package.json' ), 'updated successfully', chalk.green( '✔' ) );
                resolve();
            })
            .catch( function( err ) {
                logger.log( 'Updating package.json failure', chalk.red( '✗' ) );
                reject();
            });

        //@todo - need to top gulpfile and index files with the banner 

    });
}
