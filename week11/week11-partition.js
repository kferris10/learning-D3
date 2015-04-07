var width = 500;
var height = 450;

// initializing plot
var svg11_partition = d3.select("body").select("#week11-partition")
	.append("svg")
    .attr("width", width)
    .attr("height", height);

// generating rectangles (?)
var rect = svg11_partition.selectAll("rect");
