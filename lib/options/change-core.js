/**
 * Treihadwyl Package Manager
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * @Command
 * tpm -c path
 *
 * @Desc
 * choose a new core package directory to link to
 *
 * @Use
 * `tpm -c path` - stores a new core package location
 */

module.exports = function( pkgpath ) {

    var config = require( '~/.tpm/config.json' );

    console.log( config );

}
