
'use strict';

var fs      = require( 'fs' );
var async   = require( 'async' );
var utils   = require( './lib/utils' );

var rand    = utils.random;
var inspect = utils.inspector();

// config task
function getConfig(callback) {
  fs.readFile('config.json', function(err, data){
    if (err) return callback(err);

    try {
      var config = JSON.parse( data.toString() );
      return callback( null, config );
    } catch ( e ) {
      return callback( e );
    }
  });
}

// get a database instance
function getDB(callback, deps) {
  setTimeout(function(){
    var db = {
      query: function(q, cb) {
        setTimeout(function(){
          cb( null, [ { name: 'johnny ray' }, { name: 'john doe' } ] );
        }, rand( 50, 100 ) );
      }
    }
    callback( null, db );
  }, rand( 100, 200 ) );
}

// get all users in the database
function getUsers(callback, deps) {
  var db = deps.db;

  // don't do this I'm serious
  var queryStr = 'select * from users';
  db
    .query(queryStr, function(err, resultSet){
      if (err) return callback(err);

      return callback( null, resultSet );
    });
}

// drink coffee task
function drinkCoffee(callback) {
  setTimeout(function(){
    callback( null, { taste: 'Good' } );
  }, rand( 200, 300 ) );
}

var tasks = {
  config: getConfig,
  db:     [ 'config', getDB ],
  coffee: drinkCoffee,
  users:  [ 'db', getUsers ]
};

async.auto(tasks, function(err, results){
  if ( err ) throw err;
  inspect( results );
});





































