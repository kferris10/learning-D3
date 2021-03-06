// parameters 
var width12 = 550;
var height12 = 550;
var padding12 = 40;

// initializing the plot
var svg12 = d3.select("body").select("#week12-buttons")
	.append("svg")
	.attr("width", width12)
	.attr("height", height12);

// colors of points
var color = d3.scale.category10();

// scales
var xscale12 = d3.scale.ordinal()
	.domain([1])
	.rangePoints([3 * padding12, width12 - 3 * padding12]);
	//.rangeRoundBands([2 * padding12, width12 - 2 * padding12], .05);
var yscale12 = d3.scale.linear()
	.range([height12-padding12, padding12]);

// axes
var xAxis12 = d3.svg.axis().orient("bottom");
var yAxis12 = d3.svg.axis().orient("left");

// data
var one_way_anova;

// initial plot of single-mean data
d3.csv("week12/one-way-anova.csv", function(data) {
	data.forEach(function (d) {
    	d.x= +d.x;
		d.y= +d.y;
		d.x2 = +d.x2 });
	// passing data to single_mean object
  	one_way_anova = data;

  	//setting colors
	color.domain(d3.keys(one_way_anova[0]).filter(function(key) { return key !== "x"; }));

	// updating scales
	yscale12.domain([
			d3.min(one_way_anova, function(d) { return d.y; }), 
			d3.max(one_way_anova, function(d) { return d.y; })
		]);

	// drawing the circles
	svg12.selectAll("circle")
		.data(one_way_anova)
		.enter()
		.append("circle")
		.attr("fill", function(d) { return color(d.x); })
		.attr("cx", function(d) { return xscale12(d.x2); })
		.attr("cy", function(d) { return yscale12(d.y); })
		.attr("r", 4);

	// drawing axes
	xAxis12.scale(xscale12);
	svg12.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (height12 - padding12) + ")")
		.call(xAxis12);
	yAxis12.scale(yscale12);
	svg12.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + (2 * padding12) + ",0)")
		.call(yAxis12);
});

// transition to single mean data
d3.select("#week12_15").select("#single-mean")
	.on("click", function() {
		// resetting scale
		xscale12.domain([1]);

		// transition to new data
		my_transition(one_way_anova, false);
	});

// transition to one-way anova data
d3.select("#week12_15").select("#one-way-anova")
	.on("click", function() {

		// setting x scale
		xscale12.domain(
			// cheesy way to do this
			d3.range(1, d3.max(one_way_anova, function(d) { return d.x+1; }))
		);

		// transition to new data
		my_transition(one_way_anova, true);
	});

// function to transition from one dataset to the next
var my_transition = function(data, type) {

	// updating circles
	if(type) {
		svg12.selectAll("circle")
			.transition()
			.duration(5000)
			.ease("elastic")
			.attr("cx", function(d) { return xscale12(d.x); })
			.attr("cy", function(d) { return yscale12(d.y); });
	} else {
		svg12.selectAll("circle")
			.transition()
			.duration(5000)
			.ease("elastic")
			.attr("cx", function(d) { return xscale12(d.x2); })
			.attr("cy", function(d) { return yscale12(d.y); });
	}

	// update the x axis
	xAxis12.scale(xscale12);
	svg12.select(".x.axis")
		.transition()
		.duration(5000)
		.ease("elastic")
		.call(xAxis12)
}
