
var path = require( 'path' ),

    should = require( 'chai' ).should,
    rimraf = require( 'rimraf' ),
    fs = require( '../../lib/utils/promisify-fs' ),
    utils = require( '../utils' );

suite( 'Checks fs.readFile wrapping promise works properly - ', function() {

    var expectedGet = {
            foo: 'foo',
            bar: 'bar'
        },
        expectedBuf = new Buffer( '//A comment\u000A' ),
        expectedStr = '//A comment\n';


    var root = process.cwd();

    setup( function() {

    });

    teardown( function() {
        rimraf.sync( path.join( root, 'tests/expected/write.json' ) );
    });


    test( 'Get should return a json file as an object', function( done ) {
        fs.get( path.join( root, 'tests/fixtures/test.json' ) )
            .then( function( res ) {

                res.should.be.a( 'object' );
                utils.objectIs( res, expectedGet ).should.equal( true );

                done();
            });
    });


    test( 'Get should return a file as a buffer', function( done ) {
        fs.get( path.join( root, 'tests/fixtures/test.js' ) )
            .then( function( res ) {

                res.should.be.a( 'object' );
                utils.bufferIs( res, expectedBuf ).should.equal( true );

                done();
            });
    });


    test( 'Get with optional utf8 encoding should return a string', function( done ) {
        fs.get( path.join( root, 'tests/fixtures/test.js' ), { encoding: 'utf8' } )
            .then( function( res ) {

                res.should.be.a( 'string' );
                res.should.equal( expectedStr );

                done();
            });
    });
});
