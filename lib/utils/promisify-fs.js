/**
 * Treihadwyl Package Manager
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 */

var fs = require( 'fs' ),
    path = require( 'path' ),

    rimraf = require( 'rimraf' ),
    chalk = require( 'chalk' ),
    Promise = require( 'es6-promise' ).Promise,

    logger = require( './log' );


/**
 * Handles a file error
 * Just logs and rejects the promise
 */
function handleFileError( reject, filepath, err ) {
    if ( err.code === 'ENOENT' ) {
        logger.log( chalk.red( 'error:'), chalk.cyan( filepath ), chalk.red( 'does not exist' ) );
        reject( err );
        return;
    }

    new Error( 'Error accessing: ' + filepath + ' :: ' + err );
    reject( err );
    return;
}

/**
 * Promisify for fs.readFile
 * Returns an object if the file is a JSON file
 */
exports.get = function( filepath, opts ) {
    return new Promise( function( resolve, reject ) {
        fs.readFile( filepath, opts, function( err, res ) {
            if ( err ) {
                handleFileError( reject, filepath, err );
            }

            resolve( path.extname( filepath ) === '.json' ? JSON.parse( res ) : res );
        });
    });
};


/**
 * Promisify for fs.writeFile
 * Stringifies the data object if the specified file is a .json
 */
exports.write = function( filepath, data, opts ) {
    return new Promise( function( resolve, reject ) {
        fs.writeFile( filepath, path.extname( filepath ) === '.json' ? JSON.stringify( data, null, 2 ) : data, opts, function( err ) {
            if ( err ) {
                handleFileError( reject, filepath, err );
            }

            resolve();
        });
    });
};


/**
 * Promisify for fs.symlink
 */
exports.symlink = function( srcpath, destpath ) {
    return new Promise( function( resolve, reject ) {
        fs.symlink( srcpath, destpath, 'dir', function( err ) {
            if ( err ) {
                handleFileError( reject, srcpath, err );
            }

            resolve();
        });
    });
};


/**
 * Promisify for rimraf
 */
exports.rimraf = function( path ) {
    return new Promise( function( resolve, reject ) {
        rimraf( path, function( err ) {
            if ( err ) {
                handleFileError( reject, path, err );
            }

            resolve();
        });
    });
};
