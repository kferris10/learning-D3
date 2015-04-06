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
var tooltip_data = d3.csv("example.csv", function(d) {
  return {
    x: +d.X,
    y: +d.Y
  };
}, function(error, rows) {
  console.log(rows);
});
/*

// scales
var xscale = d3.scale.linear()
	.domain([ d3.min(tooltip_data, function(d) { return d.x; }), 
			  d3.max(tooltip_data, function(d) { return d.x; }) ])
	.range([padding, w - padding]);
var yscale = d3.scale.linear()
	.domain([ d3.min(tooltip_data, function(d) { return d.y; }), 
			  d3.max(tooltip_data, function(d) { return d.y; }) ])
	.range([h - padding, padding]);

// drawing the circles
svg.selectAll("circle")
	.data(tooltip_data)
	.enter()
	.append("circle")
	.attr("cx", function(d) { return xscale(d.x); })
	.attr("cy", function(d) { return yscale(d.y); })
	.attr("r", function(d) { return d.x; })
	.attr("fill", "teal")
	.attr("stroke", "orange");

// tooltips


*/