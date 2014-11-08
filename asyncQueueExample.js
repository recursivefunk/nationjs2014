
'use strict';

var async       = require( 'async' );
var utils       = require( './lib/utils' );
var inspect     = utils.inspector();
var concurrency = 1;

// -------------------------- define the tasks
var task1 = {
  func: function(cb) {
    setTimeout(function(){
      console.log( '\n   task 1' );
      cb();
    }, utils.random( 100, 500 ) );
  }
};

var task2 = {
  func: function(cb) {
    setTimeout(function(){
      console.log( '\n   task2' );
      cb();
    }, utils.random( 100, 500 ) );
  }
};

var errorTask = {
  func: function(cb) {
    setTimeout(function(){
      cb( 'an error' );
    }, utils.random( 100, 500 ) );
  }
};




// -------------------------- queue setup

// initialize the queue
var q = async.queue(function (task, callback) {
  task.func( callback );
}, concurrency);

// add tasks to the queue
q.push( [ task1, task2, errorTask ], function(err) {

  if ( err ) {
    throw err;
  }

  console.log( '   finished a task!' );
})
