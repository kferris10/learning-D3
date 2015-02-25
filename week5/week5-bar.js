// parameters
var w = 550;
var h = 550;
var padding = 40;
var labelpadding = padding / 2;

// scales
var x_scale = d3.scale.ordinal()
    .rangeRoundBands([0, w], .1);
var y_scale = d3.scale.linear()
    .range([h, 0]);

// axes
var formatPercent = d3.format(".0%");
var x_axis = d3.svg.axis()
	.scale(x_scale)
	.orient("bottom");
var y_axis = d3.svg.axis()
	.scale(y_scale)
	.orient("left");

// declaring the plot(?)
var svg = d3.select("body").select("#week5-bar")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

// data
d3.tsv("week5-bar-data.txt", type, function(error, data) {
	// updating domains of scales
	x_scale.domain(data.map(function(d) { return d.letter; }));
	y_scale.domain([0, d3.max(data, function(d) { return d.frequency; })]);

	// adding axes
	svg.append("g")
		.attr("class", "x axis")
		.call(x_axis);
	svg.append("g")
		.attr("class", "y axis")
		.call(y_axis);

	// adding data to plot
	svg.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("x", function(d) { return x_scale(d.letter); })
		.attr("width", x.rangeBand())
		.attr("y", function(d) { return y_scale(d.frequency); })
		.attr("height", function(d) { return height - y_scale(d.frequency); });

});

function type(d) {
  d.frequency = +d.frequency;
  return d;
}

