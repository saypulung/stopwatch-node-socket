var reconnect = require('reconnect');
var duplexEmitter = require('duplex-emitter');

var express = require('express')
var app = express()


var portapi = 8080;
var port = 3000;
var host = 'localhost';
var has_send = 0;
const STATUS_CONNECT = 1;
const STATUS_DISCONNECT = 2;

var reconnector =
reconnect(function(stream) {
  var peer = duplexEmitter(stream);
  var tipe = typeof peer;
  console.log(tipe)
  peer.on('ping', function(timestamp) {
    console.log('got ping from peer %d', timestamp);
    //peer.emit('pong', timestamp, Date.now());
    if(has_send==0){
    	setTimeout(function(){
    		peer.emit('run',{coba:1})
    		has_send = 1;
    		reconnector.disconnect();
    	},1)
    }
    
  });

  stream.once('error',function(e){
  	console.log('error')
  })

}).connect(port, host);

/*
app.get('/',function(req,res){
	res.send('root')
})
app.get('/run',function(req,res){
	res.send('run')
})
app.get('/stop',function(req,res){
	res.send('stop')
})
app.listen(portapi,function(){
	console.log('Server port run '+portapi)
})
//*/