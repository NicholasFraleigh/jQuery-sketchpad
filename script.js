//todo:  resize container on reset to fit proper (maybe make boxes better? both?)
// 	     different color/settings
//       prettify for presentation

var width = 16;
var total = 0;

$(document).ready(function(){
	total = checkLoops(width);
	console.log(total);
	setup(total, width);
	var colorOrig=$(".square").css('background-color');

	$("#reset").click(function(){
		$(".square").remove();
		width = prompt("How many rows would you like?");
		reset(width);
	});
	
});


var checkLoops = function(width){
	return width*width;
}

var setup = function(total, width){
	var pixelWidth = Math.floor(800/width);
	var newContainer = pixelWidth*width;
	newContainer += "px";

	$(function(){
		$('#container').css('width', newContainer)
	})

	for(i=0;i<total;i++){
		console.log("hmmm");
		$('#container').append('<div class = "square" style = "width:' + pixelWidth +'px; height:' + pixelWidth + 'px; margin:none;"></div>');
	};
	// default coloring - need logic for different styles
	// trail, gradient(reapply), gradient(continuos), random
	$(".square").mouseenter(function() {
        //mouse over
        $(this).css('background', '#000')
    });
}

var reset = function(width){
	total = checkLoops(width);
	setup(total, width);
}