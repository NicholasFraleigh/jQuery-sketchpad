//todo: 
// 	     different color/settings
//       prettify for presentation

var width = 16;
var total = 0;

$(document).ready(function(){
	reset(width);
	//var colorOrig=$(".square").css('background-color');

	$("#reset").click(function(){
		$(".square").remove();
		width = prompt("How many rows would you like?");
		if(width > 128){
			alert("Sorry, maximum is 128 rows. Creating largest possible sketchpad.");
			width = 128;
		};

		reset(width);
		$('html,body').animate({
        	scrollTop: $("#container").offset().top}, 'slow');
		
	});
	
});


var setup = function(total, width, paradigm){
	// determine size of 'pixels'
	var pixelWidth = Math.floor(800/width);
	var newContainer = pixelWidth*width;
	var redChan = 000;
	var greenChan = 000;
	var blueChan = 000;
	var reset = false;
	newContainer += "px";

	//adjust main container to fit perfectly
	$(function(){
		$('#container').css('width', newContainer)
	})

	//build sketchpad from divs
	for(i=0;i<total;i++){
		$('#container').append('<div class = "square" style = "width:' + pixelWidth +'px; height:' + pixelWidth + 'px; margin:none;"></div>');
	};

	// default coloring - need logic for different styles
	// trail, gradient(reapply), gradient(continuous), random
	if(paradigm === "default"){
		$(".square").mouseenter(function() {
        	$(this).css('background', '#000')
    	});
	} else if (paradigm === "gradient"){
		$(".square").mouseenter(function() {
    		if(blueChan <= 255 && greenChan === 0 && redChan === 0){
    			colour = 'rgb(0,0,' + blueChan.toString() +')';
    			blueChan += 16;
    		} else if (greenChan <= 255 && redChan === 0){
    			blueChan = 255 - greenChan;
    			colour = 'rgb(0,' + greenChan.toString() +',' +blueChan.toString() + ')'; 
    			greenChan+=16;
    		} else if (redChan <= 255 && !reset){
    			greenChan = 255 - redChan;
    			colour = 'rgb(' + redChan + ',' + greenChan + ',0)';
    			redChan +=16;
    			if (redChan >= 255){
    				reset = true;
    			}
    		} else if (reset){
    			colour = 'rgb(' + redChan + ',0,0)';
    			redChan -= 16;
    			if (redChan <= 0){
    				redChan = 0;
    				reset = false;
    			}
    		}
    		// pad to 6 digits	  
        	$(this).css('background', colour);
    	});
	} else if (paradigm === "random"){		
		$(".square").mouseenter(function() {
			var colour = Math.floor(Math.random()*16777215).toString(16);
			colour = "#"+colour;
        	$(this).css('background', colour)
    	});
	} else if (paradigm === "follow"){
		$(".square").mouseenter(function() {
			$(this).fadeTo(0,1);
        	$(this).css('background', '#000');
        	$(this).fadeTo(800,0);
        	//$(this).css('background', '#fff');    	
    	});
	}
	

	

}

var reset = function(width){
	var paradigm = $('input:radio[name=color-select]:checked').val();
	total = width*width;		
	setup(total, width, paradigm);
}