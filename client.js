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
var status = 0;
app.get('/',function(req,res){

	var reconnector =
	reconnect(function(stream) {
  	var peer = duplexEmitter(stream);
  	var tipe = typeof peer;
  	console.log(tipe)
  	peer.on('ping', function(timestamp) {
    	console.log('got ping from peer %d', timestamp);
    	setTimeout(function(){status=STATUS_CONNECT;reconnector.disconnect();},3000);
 	 });

  	stream.once('error',function(e){
  		console.log('error')
  	})

	}).connect(port, host);
	res.send('root')
})
app.get('/run',function(req,res){
	var reconnector =
	reconnect(function(stream) {
  	var peer = duplexEmitter(stream);
  	var tipe = typeof peer;
  	var has_run = 0;
  	console.log(tipe)
  	peer.on('ping', function(timestamp) {
    	console.log('got ping from peer %d', timestamp);
    	peer.emit('run',{coba:1});
    	setTimeout(function(){
    		
    	},3000);
 	 });

  	stream.once('error',function(e){
  		console.log('error')
  	})

	}).connect(port, host);
	
	res.send('run')
})
app.get('/stop',function(req,res){
	res.send('stop')
})
app.listen(portapi,function(){
	console.log('Server port run '+portapi)
})
//*/