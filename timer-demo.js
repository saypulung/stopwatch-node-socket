var Stopwatch = require('timer-stopwatch');

var timer = new Stopwatch(80*1000); // A new countdown timer with 60 seconds
var stopwatch = new Stopwatch(); // A new count up stopwatch. Starts at 0.
var h,m,s,temp_s,printtime;
timer.start();
timer.onTime(function(t){
	temp_s = t.ms/1000;
	s = temp_s % 60;
	m = temp_s/60;
	h = temp_s/3600;
	printtime = ((h<10) ? '0'+parseInt(h) : parseInt(h) )+ ':'  + ((m<10) ? '0'+parseInt(m) : parseInt(m) )+ ':'  + ((s<10) ? '0'+parseInt(s) : parseInt(s) );
	console.log(printtime);
})
//stopwatch.start();

stopwatch.onTime(function(t){
	temp_s = t.ms/1000;
	s = temp_s % 60;
	m = temp_s/60;
	h = temp_s/3600;
	printtime = ((h<10) ? '0'+parseInt(h) : parseInt(h) ) + ':' + ((m<10) ? '0'+parseInt(m) : parseInt(m) )+ ':'  + ((s<10) ? '0'+parseInt(s) : parseInt(s) );
	console.log(printtime);
})