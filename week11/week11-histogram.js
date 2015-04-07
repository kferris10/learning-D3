// margins
var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 550 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// initialize plot
var svg = d3.select("body").select("#week11-histogram")
	.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// scales
var x = d3.scale.linear()
    .domain([0, 1])
    .range([0, width]);

// data
var values = d3.range(1000).map(d3.random.normal());
var data11_histogram = d3.layout.histogram()
    .bins(x.ticks(20))
    (values);

var y = d3.scale.linear()
	.domain([0, d3.max(data11_histogram, function(d) { return d.y; }) ])
	.range([height, 0]);

// draw bars
var bar = svg.selectAll(".bar")
    .data(data11_histogram)
	.enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

bar.append("rect")
    .attr("x", 1)
    .attr("width", x(data11_histogram[0].dx) - 1)
    .attr("height", function(d) { return height - y(d.y); });

