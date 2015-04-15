// parameters 
var width12 = 550;
var height12 = 550;
var padding12 = 40;

// initializing the plot
var svg12 = d3.select("body").select("#week12-buttons")
	.append("svg")
	.attr("width", width12)
	.attr("height", height12);

// scales
var xscale12 = d3.scale.linear().range([2 * padding12, width12 - 2 * padding12]);
var yscale12 = d3.scale.linear().range([height12-padding12, padding12]);

// axes
var xAxis12 = d3.svg.axis().orient("bottom");
var yAxis12 = d3.svg.axis().orient("left");

// data
var single_mean;
var one_way_anova;

// initial plot of single-mean data
d3.csv("week12/single-mean.csv", function(data) {
	data.forEach(function (d) {
    	d.x= +d.x;
		d.y= +d.y });
	// passing data to single_mean object
  	single_mean = data;

	// updating scales
	xscale12.domain([
			d3.min(single_mean, function(d) { return d.x - .01; }), 
			d3.max(single_mean, function(d) { return d.x + .01; })
		]);
	yscale12.domain([
			d3.min(single_mean, function(d) { return d.y; }), 
			d3.max(single_mean, function(d) { return d.y; })
		]);

	// drawing the circles
	svg12.selectAll("circle")
		.data(single_mean)
		.enter()
		.append("circle")
		.attr("cx", function(d) { return xscale12(d.x); })
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
d3.select("#week12").select("#single-mean")
	.on("click", function() {
		d3.csv("week12/single-mean.csv", function(data) {
			data.forEach(function (d) {
		    	d.x= +d.x;
				d.y= +d.y });
			// passing data to one_way_anova object
		  	single_mean = data;

		  	// transition to new data
			x_transition(single_mean);
		})
	});

// transition to one-way anova data
d3.select("#week12").select("#one-way-anova")
	.on("click", function() {

		// one-way-anova data
		d3.csv("week12/one-way-anova.csv", function(data) {
			data.forEach(function (d) {
		    	d.x= +d.x;
				d.y= +d.y });
			// passing data to one_way_anova object
		  	one_way_anova = data;

		  	// transition to new data
			x_transition(one_way_anova);
		});

	});

// function to transition from one dataset to the next
var x_transition = function(data) {
	// updating xscale
	xscale12.domain([
			d3.min(data, function(d) { return d.x - .01; }), 
			d3.max(data, function(d) { return d.x + .01; })
		]);


	// updating circles
	svg12.selectAll("circle")
		.data(data)
		.transition()
		.duration(4000)
		.ease("elastic")
		.attr("cx", function(d) { return xscale12(d.x); });

	// update the x axis
	xAxis12.scale(xscale12);
	svg12.select(".x.axis")
		.transition()
		.call(xAxis12)
}
