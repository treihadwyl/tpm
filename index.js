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

var pkg = require( './package.json' );

var tpm = module.exports = require( 'commander' );

// Set up tpm global options
tpm
    .version( pkg.version )
    .option( '-d, --debug', 'runs in debug mode' )
    .option( '-c, --core <path>', 'used to specify a new core package to link to' );


// Attach commands
require( './lib/commands/link' );


// Fire in to tpm
tpm.parse(process.argv);


// Handle options
if ( tpm.core ) {
    require( './lib/options/change-core' );
}
