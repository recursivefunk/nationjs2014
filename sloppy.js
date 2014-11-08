
'use strict';

var fs    = require( 'fs' );

fs.readFile('config.json', function(err, data){
  if (err) throw err;

  var config;

  try {
    config = JSON.parse( data.toString() );
  } catch ( e ) {
    throw e;
  }

  getDB(config, function(err, db){
    if (err) throw err;

    // don't ever do this in real life, btw
    var queryStr = 'select * from users';
    db.query(queryStr, function(err, resultSet){
      if (err) throw err;

      drinkCoffee(function(err, experience) {
        if (err) throw err;

        if ( experience.taste === 'Good' ) {
          console.log('mmm')
        } else {
          throw 'me no likey';
        }
      });
    });
  });
});






// ----------------------------- helpers

function getDB(config, callback) {
  setTimeout(function(){
    var db = {
      query: function(q, cb) {
        setTimeout(function(){
          cb( null, [ { name: 'johnny ray' } ] )
        });
      }
    }
    callback( null, db );
  }, 100);
}

function drinkCoffee(callback) {
  setTimeout(function(){
    callback( null, { taste: 'Good' } );
  }, 200 );
}
