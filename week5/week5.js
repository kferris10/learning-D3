// parameters
var w = 550;
var h = 550;
var n = 50;
var max_radius = 20;
var padding = 40;
var labelpadding = padding / 2;

// data
var dataset = [];
for(i = 0; i < n; i++) {
	var newX = 10 + 3 * Math.random();
	var newY = 6 + 2 * newX + 2 * Math.random();
	var newZ = 3 + 2 * newX + 4 * newY + 4 * Math.random();
	dataset.push([newX, newY, newZ]);
}

//scales
var x_scale = d3.scale.linear()
				.domain(
					[
						d3.min(dataset, function(d) {
							return(d[0]);
						}), 
						d3.max(dataset, function(d) {
							return(d[0]);
						})
					]
				)
				.range([padding, w - padding])
				.nice();
var y_scale = d3.scale.linear()
				.domain(
					[
						d3.min(dataset, function(d) {
							return(d[1]);
						}), 
						d3.max(dataset, function(d) {
							return(d[1]);
						})
					]
				)
				.range([h-padding, padding])
				.nice();
var z_scale = d3.scale.linear()
				.domain(
				[
					d3.min(dataset, function(d) {
							return(d[2]);
						}), 
						d3.max(dataset, function(d) {
							return(d[2]);
						})
					]
				)
				.range([0, max_radius])
				.nice();

// axes
var x_axis = d3.svg.axis()
				.scale(x_scale)
				.orient("bottom")
				.ticks(6);
var y_axis = d3.svg.axis()
				   .scale(y_scale)
				   .orient("left")
				   .ticks(6);

// initializing the plot
var svg = d3.select("body").select("#plot5")
			.append("svg")
			.attr("width", w)
			.attr("height", h);
// adding the axes
svg.append("g")
	.attr("class", "axis x_axis")
	.attr("transform", "translate(0," + (h - padding) + ")")
	.call(x_axis);
svg.append("g")
   .attr("class", "axis y_axis")
   .attr("transform", "translate(" + (padding) + ", 0)")
   .call(y_axis);
// declaring the circles
var circles = svg.selectAll("circle")
				 .data(dataset)
				 .enter()
				 .append("circle")
				 .on("mouseover", function() {
				 	// change fill
				 	d3.select(this)
				 		.attr("fill", "orange");
				 })
				 .on("mouseout", function() {
				 	d3.select(this)
				 		.transition()
				 		.duration(1000)
				 		.attr("fill", "blue");
				 });
// attributes of the circles
circles.attr("cx", function(d) {
			return x_scale(d[0]);
		})
		.attr("cy", function(d) {
			return y_scale(d[1]);
		})
		.attr("r", function(d) {
			return z_scale(d[2]);
		})
		.attr("fill", "blue")
		.attr("stroke", "orange");

// on click, do something
d3.select("body").select("#plot5")
	.on("click", function() {
		// new dataset
		var new_data = [];
		for(i = 0; i < n; i++) {
			var newX = 10 + 3 * Math.random();
			var newY = 6 + 2 * newX + 2 * Math.random();
			var newZ = 3 + 2 * newX + 4 * newY + 4 * Math.random();
			new_data.push([newX, newY, newZ]);
		}

		// update scales
		x_scale.domain(
			[
				d3.min(new_data, function(d) {
					return(d[0]);
				}), 
				d3.max(new_data, function(d) {
					return(d[0]);
				})
			]
		);
		y_scale.domain(
			[
				d3.min(new_data, function(d) {
					return(d[1]);
				}), 
				d3.max(new_data, function(d) {
					return(d[1]);
				})
			]
		);

		// update circles
		svg.selectAll("circle")
			.data(new_data)
			.transition()
			.delay(function(d, i) {
				return i / dataset.length * 5000;
			})
			.duration(1000)
			.attr("cx", function(d) {
				return x_scale(d[0]);
			})
			.attr("cy", function(d) {
				return y_scale(d[1]);
			})
			.attr("r", function(d) {
				return z_scale(d[2]);
			});

		// update axes
		svg.select(".x_axis")
			.transition()
			.duration(1000)
			.call(x_axis);
		svg.select(".y_axis")
			.transition()
			.duration(1000)
			.call(y_axis);
	});