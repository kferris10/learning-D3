// parameters 
var width12 = 550;
var height12 = 550;
var padding12 = 40;

// initializing the plot
var svg11 = d3.select("body").select("#week12-buttons")
	.append("svg")
	.attr("width", width12)
	.attr("height", height12);

// data
var single_mean;
d3.csv("week12/single-mean.csv", function(data) {
	data.forEach(function (d) {
    	d.x= +d.x;
		d.y= +d.y });
	// passing data to single_mean object
  	single_mean = data;
});

// scales
var yscale = d3.scale.linear()
	.domain(d3.min(single_mean, function(x) { return d.y; }), 
			d3.max(single_mean, function(x) { return d.y; }))
	.range(height12-padding, padding);

	


