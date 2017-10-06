var Stopwatch = require('timer-stopwatch');
var stopwatch = new Stopwatch();

var net = require('net');
var server = net.createServer();
var port = 3000;
server.listen(port);
server.once('listening', function() {
  console.log('Server listening on port %d', port);
});

var coba = 0;
var run_stopwatch = 0;
var duplexEmitter = require('duplex-emitter');
function parseStopwatch(time){
  var temp_s = time.ms/1000;
  var s = temp_s % 60;
  var m = temp_s/60;
  var h = temp_s/3600;
  var printtime = ((h<10) ? '0'+parseInt(h) : parseInt(h) ) + ':' + ((m<10) ? '0'+parseInt(m) : parseInt(m) )+ ':'  + ((s<10) ? '0'+parseInt(s) : parseInt(s) );
  return printtime;
}
stopwatch.onTime(function(t){
  console.log(parseStopwatch(t))
})
setInterval(function() {
    if(coba==1){
      if(run_stopwatch == 0){
        stopwatch.start();     
        run_stopwatch = 1;
      }
    }
    if(coba==0){
      run_stopwatch = 0;
      stopwatch.stop();
    }
  }, 50);

server.on('connection', function(stream) {
  var peer = duplexEmitter(stream);

  var interval =
  setInterval(function() {
  		peer.emit('ping', Date.now());
  }, 1000);
  
  peer.on('pong', function(myTimestamp, hisTimestamp) {
   	console.log('got pong from peer with args %d and %d', myTimestamp, hisTimestamp);
  });	
  peer.on('run',function(mode){
    if(typeof mode.coba !== 'undefined'){
      coba = mode.coba;
    }
  })
  stream.on('close',function(err){
    //coba=0
  	console.log('close')
  })
  stream.once('error',function(err){
  	console.log('Client not exist')
  })
  
  
});
server.on('close', function(stream) {
	console.log('Connection closed');
});
server.once('error', function(err) {
	console.log('Connection error '+err);
});
server.on('end', function(stream) {
	console.log('Connection end');
});
server.on('timeout', function(stream) {
	console.log('Connection timeout');
});