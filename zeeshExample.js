
  var fs    = require( 'fs' );
  var zmq   = require( 'zmq' );
  var sock  = zmq.socket( 'push' );
  var Zeesh = require( 'zeesh' );
  var z     = new Zeesh();
  // ZeroMQ connection
  var opts = {
    host: '127.0.0.1',
    port: 3000
  };

  z.on('ready', function(){

    var stream = z.stream();

    stream.pipe( fs.createWriteStream( './foo.txt' ) );

    // send data to be streamed
    sock.bindSync( 'tcp://' + opts.host + ':' + opts.port );
    sock.send( 'foo 0\n' );
    sock.send( 'foo 1\n' );

    setTimeout( function(){
      var data = fs.readFileSync( './foo.txt' ).toString();
      console.log( data );
      process.exit();
    }, 1000 );

  })

  .connect();
