// parameters
var w = 550;
var h = 450;
var n = 40;
var padding = 100;

// initializing the plot
var svg11 = d3.select("body").select("#week11-tooltip")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

// data
/*
var tooltip_data;
d3.csv("week11/tooltip-data.csv", function(data) {
	data.forEach(function (d) {
    	d.X = +d.X;
		d.Y = +d.Y });
	// passing data to tooltip_data object
  	tooltip_data = data;
});
*/
var tooltip_data = [ {X: 5, Y: 20}, {X: 10, Y: 40}];


var xmin = d3.min(tooltip_data, function(d) { return d.X; });

// scales
var xscale = d3.scale.linear()
	.domain([ xmin, 
			  d3.max(tooltip_data, function(d) { return d.X; }) ])
	.range([padding, w - padding]);
var yscale = d3.scale.linear()
	.domain([ d3.min(tooltip_data, function(d) { return d.Y; }), 
			  d3.max(tooltip_data, function(d) { return d.Y; }) ])
	.range([h - padding, padding]);
var rscale = d3.scale.linear()
	.domain([ d3.min(tooltip_data, function(d) { return d.X; }), 
			  d3.max(tooltip_data, function(d) { return d.X; }) ])
	.range([5, 20]);

// drawing the circles
var circles = svg11.selectAll("circle")
	 .data(tooltip_data)
	 .enter()
	 .append("circle")
	 .attr("cx", function(d) { return xscale(d.X); })
	 .attr("cy", function(d) { return yscale(d.Y); })
	 .attr("r", function(d) { return rscale(d.X); })
	 .attr("fill", "teal")
	 .attr("stroke", "orange");

// tooltips
circles.on("mouseover", function(d) {
		// determine position of circle
		var xPos = d3.select(this).attr("cx");
		var yPos = d3.select(this).attr("cy");

		// create a tooltip
		svg11.append("text")
			.attr("id", "tooltip")
			.attr("x", xPos)
			.attr("y", yPos)
			.attr("fill", "black")
			.attr("font-size", "20px")
			.text("X: " + d.X);
	})
	.on("mouseout", function() {
		d3.select("#tooltip").remove();
	});

