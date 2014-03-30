/**
 * Treihadwyl Package Manager
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * Simple logging module.
 */

var extend = require( 'lodash-node/modern/objects/assign' ),
    values = require( 'lodash-node/modern/objects/values'),
    clone = require( 'lodash-node/modern/objects/clone' ),
    promptly = require( 'promptly' ),
    Promise = require( 'es6-promise' ).Promise,
    chalk = require( 'chalk' );


// Expose API
module.exports = (function() {

    var opts = {
            indent: 0,
            naked: false,
            pre: '[' + chalk.magenta( 'tpm' ) + ']'
        },

        _instanceOpts = clone( opts );

    return {

        indent: function( num ) {
            _instanceOpts.indent = Array( num || 4 + 1 ).join( ' ' );

            return this;
        },

        naked: function( flag ) {
            _instanceOpts.naked = typeof flag === 'undefined' ? true : flag;

            return this;
        },

        log: function() {

            var args = values( arguments );

            if ( _instanceOpts.indent ) {
                args.unshift( _instanceOpts.indent );
            }

            if ( !_instanceOpts.naked ) {
                args.unshift( opts.pre );
            }

            _instanceOpts = clone( opts );

            console.log.apply( this, args );
        },

        logline: function() {
            console.log( opts.pre, '' );
        },

        prompt: function() {
            return new Promise( function( resolve, reject ) {
                promptly.prompt( '', function( err, value ) {
                    if ( err ) {
                        // It cant err, no validator is set
                        reject( err );
                        return;
                    }

                    resolve( value );
                });
            });
        }

    };

})();
