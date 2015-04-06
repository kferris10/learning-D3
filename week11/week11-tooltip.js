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
var tooltip_data = [];
d3.csv("week11/tooltip-data.csv", function(d) {
	tooltip_data = d;
});

// scales
var xscale = d3.scale.linear()
	.domain([ d3.min(tooltip_data, function(d) { return d.X; }), 
			  d3.max(tooltip_data, function(d) { return d.X; }) ])
	.range([padding, w - padding]);
var yscale = d3.scale.linear()
	.domain([ d3.min(tooltip_data, function(d) { return d.Y; }), 
			  d3.max(tooltip_data, function(d) { return d.Y; }) ])
	.range([h - padding, padding]);

// drawing the circles
svg11.selectAll("circle")
	 .data(tooltip_data)
	 .enter()
	 .append("circle")
	 .attr("cx", function(d) { return xscale(d.X); })
	 .attr("cy", function(d) { return yscale(d.Y); })
	 .attr("r", function(d) { return d.X; })
	 .attr("fill", "teal")
	 .attr("stroke", "orange");

// tooltips

