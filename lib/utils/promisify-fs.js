/**
 * Treihadwyl Package Manager
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 */

var fs = require( 'fs' ),
    path = require( 'path' ),

    logger = require( './log' ),
    chalk = require( 'chalk' ),
    Promise = require( 'es6-promise' ).Promise;

/**
 * Promisify for fs.readFile
 * Returns an object if the file is a JSON file
 */
exports.get = function( filepath, opts ) {
    return new Promise( function( resolve, reject ) {
        fs.readFile( filepath, opts, function( err, res ) {
            if ( err ) {
                if ( err.code === 'ENOENT' ) {
                    logger.log( chalk.red( 'error:'), chalk.cyan( filepath ), chalk.red( 'file does not exist' ) );
                    reject( err );
                    return;
                }

                new Error( 'Error getting file: ' + filepath + ' :: ' + err );
                reject( err );
                return;
            }

            resolve( path.extname( filepath ) === '.json' ? JSON.parse( res ) : res );
        });
    });
};
