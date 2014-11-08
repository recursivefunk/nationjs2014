
'use strict';

var fs          = require( 'fs' );
var JSONStream  = require('JSONStream')
var es          = require( 'event-stream' );
var utils       = require( './lib/utils' );
var inspect     = utils.inspector();

fs
  .createReadStream( './data.json' )

  .pipe( JSONStream.parse( 'data.*' ) )

  .pipe(es.map(function(data, cb){
    var foo = {
      eyeColor: data.eyeColor,
      name: data.name
    };
    return cb( null, foo );
  }))

  .pipe( filterEyes( 'blue' ) )

  .pipe(es.mapSync(function (data) {
    inspect( data );
    return data;
  }))

  .pipe( es.stringify() )

  .pipe( fs.createWriteStream( './out' ) )

  // -------------------- helpers

function filterEyes( color ) {
  return es.through(
    function write(data) {
      if ( data.eyeColor === color ) {
        this.emit( 'data', data );
      }
    },

    function end() {
      this.emit( 'end' );
    }
  );
}
