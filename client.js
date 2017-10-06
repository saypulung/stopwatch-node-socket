var reconnect = require('reconnect');
var duplexEmitter = require('duplex-emitter');

var portapi = 8080;
var port = 3000;
var host = 'localhost';
var has_send = 0;
var reconnector =
reconnect(function(stream) {
  var peer = duplexEmitter(stream);

  peer.on('ping', function(timestamp) {
    console.log('got ping from peer %d', timestamp);
    //peer.emit('pong', timestamp, Date.now());
    if(has_send==0){
    	setTimeout(function(){
    		peer.emit('run',{coba:1})
    		has_send = 1;
    	},1)
    }
    
  });

  stream.once('error',function(e){
  	console.log('error')
  })

}).connect(port, host);