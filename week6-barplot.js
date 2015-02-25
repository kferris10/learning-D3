// plot parameters
var w = 550;
var h = 550;
var padding = 20;
var label_padding = padding / 2;

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
// parameters about data
var max_height = d3.max(dataset1, function(d) { return d.value; });

// scales
var x_scale = d3.scale.ordinal()
	.domain(d3.range(dataset1.length))
	.rangeRoundBands([padding, w - padding], 0.05);
var y_scale = d3.scale.linear()
	.domain([0, max_height])
	.range([h - padding, padding]);

// initializing the plot
var svg = d3.select("body").select("#week6-bar")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

// drawing the bars
svg.selectAll("rect")
	.data(dataset1)
	.enter()
	.append("rect")
	.attr("x", function(d, i) {
	  return x_scale(i);
	})
	.attr("y", function(d) {
		return h - y_scale(d.value);
	})
	.attr("width", x_scale.rangeBand())
	.attr("height", function(d) { return y_scale(d.value); })
	.attr("fill", function(d) {
		return "rgb(0, 0, " + (d.value * 10) + ")";
	});

// adding text labels
svg.selectAll("text")
	.data(dataset1)
	.enter()
	.append("text")
	.text(function(d) { return d.value; })
	.attr("x", function(d, i) {
		return x_scale(i) + x_scale.rangeBand() / 2;
	})
	.attr("y", function(d) {
		return h - y_scale(d.value) + 14;
	});

	