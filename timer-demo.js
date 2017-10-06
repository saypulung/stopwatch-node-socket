var Stopwatch = require('timer-stopwatch');

var timer = new Stopwatch(20*1000); // A new countdown timer with 60 seconds
//var timer = new Stopwatch(); 
var stopwatch = new Stopwatch();
var h,m,s,temp_s,printtime;
var counter = 0;
timer.start();
timer.onTime(function(t){
	counter++;
	console.log(counter);
	if(counter>=100){
		
		//timer = new Stopwatch(50*1000);
		//timer.reset(50*1000);  
		//timer.start();
	}
	temp_s = t.ms/1000;
	s = temp_s % 60;
	m = temp_s/60;
	h = temp_s/3600;
	printtime = ((h<10) ? '0'+parseInt(h) : parseInt(h) )+ ':'  + ((m<10) ? '0'+parseInt(m) : parseInt(m) )+ ':'  + ((s<10) ? '0'+parseInt(s) : parseInt(s) );
	console.log("Countdown "+printtime);
})
timer.onDone(function(t){
	stopwatch.start();
})
//stopwatch.start();

stopwatch.onTime(function(t){
	temp_s = t.ms/1000;
	s = temp_s % 60;
	m = temp_s/60;
	h = temp_s/3600;
	printtime = ((h<10) ? '0'+parseInt(h) : parseInt(h) ) + ':' + ((m<10) ? '0'+parseInt(m) : parseInt(m) )+ ':'  + ((s<10) ? '0'+parseInt(s) : parseInt(s) );
	console.log("Clock "+printtime);
})