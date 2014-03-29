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

module.exports = require( '../../' )
    .command( 'link' )
    .option( '-p, --package <path>', 'specify package to link' )
    .description( 'used to link a module to the core - in reality its just npm link sugar' )
    .action( link );



function link() {

    console.log( 'some linking is going on' );

    // setTimeout( function() {
    //     console.log( 'it has finished now' );
    // }, 500 );

}
