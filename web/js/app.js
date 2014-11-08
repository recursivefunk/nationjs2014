
(function($, Rx){

  'use strict';

  var $input = $( '#name' );

  Rx.Observable.fromEvent( $input, 'keyup' )

    .map(function (e) {
      return e.target.value;
    })

    .filter(function (text) {
      return text.length > 2;
    })

    // .throttle( 500 )

    .subscribe(
      function(data) {
        console.log( data );
      }
    );

}(window.jQuery, window.Rx));
