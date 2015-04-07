var width = 500;
var height = 450;

// initializing plot
var svg11_partition = d3.select("body").select("#week11-partition")
	.append("svg")
    .attr("width", width)
    .attr("height", height);

// scales
var x = d3.scale.linear()
    .range([0, width]);
var y = d3.scale.linear()
    .range([0, height]);

// function to do partitions (?)
var partition = d3.layout.partition()
    .children(function(d) { return isNaN(d.size) ? d3.entries(d.size) : null; })
    .value(function(d) { return d.size; });

// generating rectangles (?)
var rect = svg11_partition.selectAll("rect");

// read in data
d3.json("week11/week11-partition-data.json", function(error, root) {
	rect = rect
  		.data(partition(d3.entries(root)[0]))
	    .enter()
	    .append("rect")
	    .attr("x", function(d) { return x(d.x); })
	    .attr("y", function(d) { return y(d.y); })
	    .attr("width", function(d) { return x(d.dx); })
	    .attr("height", function(d) { return y(d.dy); })
	    .on("click", clicked);
});