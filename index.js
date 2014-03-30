#!/usr/bin/env node
/**
 * Treihadwyl Package Manager
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * Not really a proper package manager, just helps work with the various packages
 * and modules that make up Treihadwyl
 */

var path = require( 'path' ),

    chalk = require( 'chalk' ),

    pkg = require( './package.json' ),
    defConf = require( './config.json' ),
    logger = require( './lib/utils/log' ),
    get = require( './lib/utils/promisify-fs' ).get;

var tpm = module.exports = require( 'commander' );

// Set up tpm global options
tpm
    .version( pkg.version )
    .option( '-d, --debug', 'runs in debug mode' )
    .option( '-c, --core <path>', 'used to specify a new core package to link to' );


// Attach commands
require( './lib/commands/link' );


// Handle core specification route here, before checking it is valid
if ( process.argv[ 2 ] === '-c' || process.argv[ 2 ] === '--core' ) {
    require( './lib/options/change-core' );
    return;
}


// Check config is ready to go
get( path.join( process.env.HOME, defConf.installDir, 'config.json' ) )
    .then( function( config ) {

        if ( !config.coreDir ) {
            logger.log( chalk.red( 'Error: Treihadwyl Core directory not specified' ) );
            logger.log( 'Use', chalk.cyan( '-c' ), 'inside core directory or specify path' );
            logger.logline();
            logger.log( 'need', chalk.cyan( '--help' ) + '?' );
            process.exit( 0 );
        }

        start();
    })
    .catch( function( err ) {
        logger.log( chalk.red( 'Error retrieving config' ),  '-- does it exist?' );
        process.exit(0);
    })


function start() {

    tpm.parse( process.argv );

    // Handle options
    if ( tpm.core ) {
        require( './lib/options/change-core' );
    }

    tpm.help();
}
