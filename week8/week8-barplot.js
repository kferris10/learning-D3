// plot parameters
var w = 550;
var h = 300;
var padding = 40;
var text_padding = padding / 2;

// data
var dataset1 = [ { key: 0, value: 5}, 
				 { key: 1, value: 2}, 
				 { key: 2, value: 13}, 
				 { key: 3, value: 19}, 
				 { key: 4, value: 21}, 
				 { key: 5, value: 25}, 
				 { key: 6, value: 22}, 
				 { key: 7, value: 18}, 
				 { key: 8, value: 15}, 
				 { key: 9, value: 13}  ];

// scales
var xScale = d3.scale.ordinal()
	.domain(d3.range(dataset1.length))
	.rangeRoundBands([0 + padding, w - padding], 0.05);
var yScale = d3.scale.linear()
	.domain([0, d3.max(dataset1, function(d) { return d.value; })])
	.range([h - padding, 0 + padding]);

// axes
var yAxis = d3.svg.axis()
	.scale(yScale)
	.orient("left")
	.ticks(5);

// initializing the plot
var svg = d3.select("body").select("#week8-bar")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

// drawing the bars
svg.selectAll("rect")
	.data(dataset1)
	.enter()
	.append("rect")
	.attr("x", function(d, i) { return xScale(i); })
	.attr("width", xScale.rangeBand())
	.attr("y", function(d) { return yScale(d.value); })
	.attr("height", function(d) { return h - yScale(d.value) - padding; })
	.attr("fill", "white")
	.attr("stroke", "green");

// create axes
svg.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(" + padding + ", 0)")
	.call(yAxis);

// on click, add a bar
d3.select("#week8").select("#add-week8")
	.on("click", function() {

		// adding a new row
		var newNumber = Math.floor(Math.random() * 25);
		dataset1.push({ key: 10, value: newNumber });
		xScale.domain(d3.range(dataset1.length));

		// select rectangles
		var bars = svg.selectAll("rect")
			.data(dataset1);
		// enter new data
		bars.enter()
			.append("rect")
			.attr("x", w)
			.attr("y", function(d) { return yScale(d.value); })
			.attr("width", xScale.rangeBand())
			.attr("height", function(d) { return h - yScale(d.value) - padding; })
			.attr("stroke", "green")
			.attr("fill", "white");
		// update plot to bring in new data
		bars.transition()
			.duration(500)
			.attr("x", function(d, i) { return xScale(i); })
			.attr("y", function(d) { return yScale(d.value); });
	});

// on click, remove a bar
d3.select("#week8").select("#delete-week8")
	.on("click", function() {

		// removing one row
		dataset1.pop();
		xScale.domain(d3.range(dataset1.length));

		// select rectanges
		var bars = svg.selectAll("rect")
			.data(dataset1);
		// enter new data
		bars.enter()
			.append("rect")
			.attr("x", w)
			.attr("y", function(d) { return yScale(d.value); })
			.attr("width", xScale.rangeBand())
			.attr("height", function(d) { return h - yScale(d.value) - padding; })
			.attr("stroke", "green")
			.attr("fill", "white");
		// update plot to reflect new data
		bars.transition()
			.duration(500)
			.attr("x", function(d, i) { return xScale(i); })
			.attr("y", function(d) { return yScale(d.value); })
			.attr("width", xScale.rangeBand())
			.attr("height", function(d) { return h - yScale(d.value) - padding; });
		// exit the first bar
		bars.exit()
			.transition()
			.duration(500)
			.attr("x", w)
			.remove();
	});
