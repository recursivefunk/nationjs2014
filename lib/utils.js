
exports.random = function(min, max) {
  return Math.floor( ( Math.random() * max ) + min );
};

exports.inspector = function() {
  var styles = {
    all:     'cyan',
    label:   'underline',
    other:   'inverted',
    key:     'bold',
    special: 'grey',
    string:  'green',
    number:  'magenta',
    bool:    'blue',
    regexp:  'green',
  };

  return require( 'eyes' ).inspector( { styles: styles } );
}
