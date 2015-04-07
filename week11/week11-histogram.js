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

// data
var values = d3.range(1000).map(d3.random.normal());
var data11_histogram = d3.layout.histogram()
	.bins(xticks(20))
	(values);