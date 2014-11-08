
'use strict';

var Remitter = require( 'remitter' );
var thing = new Remitter({
  host: '127.0.0.1',
  port: 6379
});

thing.connect(function() {
  setInterval(function(){
    thing.emit( 'go:channel', 'foo' );
  }, 1000)
});
