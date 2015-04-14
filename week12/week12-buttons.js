// parameters 
var width12 = 550;
var height12 = 550;
var padding12 = 40;

// initializing the plot
var svg12 = d3.select("body").select("#week12-buttons")
	.append("svg")
	.attr("width", width12)
	.attr("height", height12);


// axes
var xAxis = d3.svg.axis().orient("bottom");
var yAxis = d3.svg.axis().orient("left");

// data
var single_mean;
d3.csv("week12/single-mean.csv", function(data) {
	data.forEach(function (d) {
    	d.x= +d.x;
		d.y= +d.y });
	// passing data to single_mean object
  	single_mean = data;

	// scales
	var xscale12 = d3.scale.linear()
		.domain([
			d3.min(single_mean, function(d) { return d.x - .01; }), 
			d3.max(single_mean, function(d) { return d.x + .01; })
		])
		.range([padding12, width12-padding12]);
	var yscale12 = d3.scale.linear()
		.domain([
			d3.min(single_mean, function(d) { return d.y; }), 
			d3.max(single_mean, function(d) { return d.y; })
		])
		.range([height12-padding12, padding12]);

	// drawing the circles
	svg12.selectAll("circle")
		.data(single_mean)
		.enter()
		.append("circle")
		.attr("cx", function(d) { return xscale12(d.x); })
		.attr("cy", function(d) { return yscale12(d.y); })
		.attr("r", 4);

	// x axis
	xAxis.scale(xscale12)
	svg.append("g")
		.attr("class", "axis")
		.call(xAxis);
	// y axis
	yAxis.scale(yscale12)
	svg.append("g")
		.attr("class", "axis")
		.call(yAxis);

	// adding tooltips
	// svg12.append("text")


});


	/*
	.domain([d3.min(single_mean, function(d) { return d.y; }), 
			 d3.max(single_mean, function(d) { return d.y; })])
	.range([height12-padding12, padding12]);
	*/


