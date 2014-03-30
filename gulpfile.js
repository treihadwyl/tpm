/**
 * Treihadwyl Package Manager
 * Copyright © 2014 Matt Styles <matt@veryfizzyjelly.com>
 * Licensed under the ISC license
 * ---
 *
 * Just runs tests
 */

'use strict';

var gulp = require( 'gulp' ),
    mocha = require( 'gulp-mocha' ),
    plumber = require( 'gulp-plumber' ),
    notify = require( 'gulp-notify' ),
    gutil = require( 'gulp-util' );


gulp.task( 'test', function() {
    return gulp
        .src( 'tests/spec/**/*.js' )
        .pipe( plumber( {
            errorHandler: notify.onError( 'Test error: <%= error.message %>' )
        }))
        .pipe( mocha({
            reporter: 'nyan',
            ui: 'tdd'
        }))
        .on( 'error', function( err ) {
            gutil.log( gutil.colors.red( err.message ) );
            this.emit( 'end' );
        });
});


gulp.task( 'default', [ 'test' ], function() {
    gutil.log( 'Finished running tests' );
});
