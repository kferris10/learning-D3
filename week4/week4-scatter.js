// parameters
		var w = 550;
		var h = 550;
		var n = 40;
		var padding = 40;
		var labelpadding = padding / 2;

		// data
		var dataset = [];
		for(var i = 0; i < n; i++) {
			var newX = Math.random() * 30 + 300;
			var newY = 30 + .6 * newX + Math.random() * 10;
			var newZ = -10 + .4 * newX + .2 * newY + Math.random() * 3;
			dataset.push([newX, newY, newZ]);
		}

		// scales
		var x_scale = d3.scale.linear()
						.domain([d3.min(dataset, function(d) {
									return d[0];
								 }), 
								 d3.max(dataset, function(d) {
								 	return(d[0]);
								 })
						])
						.range([padding+3, w-padding])
						.nice();
		var y_scale = d3.scale
						.linear()
						.domain([d3.min(dataset, function(d) {
									return d[1];
								 }), 
								 d3.max(dataset, function(d) {
								 	return(d[1]);
								 })
						])
						.range([h-padding, padding])
						.nice();

		var r_scale = d3.scale
						.linear()
						.domain([d3.min(dataset, function(d) {
									return(d[2]);
								}), 
								d3.max(dataset, function(d){
									return(d[2]);
								})])
						.range([0, 20])
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

		//drawing the plot
		var svg = d3.select("body").select("#week4-scatter")
					.append("svg")
					.attr("width", w)
					.attr("height", h);
		var circles = svg.selectAll("circle")
						.data(dataset)
						.enter()
						.append("circle");
		circles.attr("cx", function(d) {
					return x_scale(d[0]);
		})
				.attr("cy", function(d) {
					return y_scale(d[1]);
				})
				.attr("r", function(d) { 
					return r_scale(d[2]); 
				})
				.attr("fill", "teal")
				.attr("stroke", "orange");

		// adding axes
		svg.append("g")
		   .attr("class", "axis")
		   .attr("transform", "translate(0," + (h - padding) + ")")
		   .call(x_axis);
		svg.append("g")
		   .attr("class", "axis")
		   .attr("transform", "translate(" + padding + ", 0)")
		   .call(y_axis);

		// adding axis titles
		svg.append("text")
    	   .attr("class", "x label")
    	   .attr("text-anchor", "middle")
    	   .attr("x", w/2)
    	   .attr("y", h - 6)
    	   .text("X");
    	svg.append("text")
    		.attr("class", "y label")
    		.attr("text-anchor", "middle")
    	    .attr("x", 5)
    	    .attr("y", h/2)
    	    .text("Y");

    	// changing data 
    	d3.select("body")
    		.on("click", function() {
    			
    			var newdataset = [];
    			// new dataset
    			for(var i = 0; i < n; i++) {
					var newX = Math.random() * 30 + 300;
					var newY = 30 + .6 * newX + Math.random() * 10;
					var newZ = -10 + .4 * newX + .2 * newY;
					newdataset.push([newX, newY, newZ]);
				}

				// update scales
				y_scale.domain(
					[
						d3.min(newdataset, function(d) {
							return d[1];
						}), 
						d3.max(newdataset, function(d) {
							return d[1];
						})
					]
				);
				x_scale.domain(
					[
						d3.min(newdataset, function(d) {
							return d[0];
						}), 
						d3.max(newdataset, function(d) {
							return d[0];
						})
					]
				);

				// update circles
				svg.selectAll("circle")
					.data(newdataset)
					.transition()
					.delay(function(d, i) {
						return i * 10000 / newdataset.length;
					})
					.duration(1000)
					.attr("cy", function(d) {
								return y_scale(d[1]);
							})
					.attr("cx", function(d) {
						return x_scale(d[0]);
					})
					.attr("r", function(d) {
						return r_scale(d[2]);
					})
					.attr("fill", function(d, i) {
						return "rgb(" (i*20) + ", " + (d[1]/20) + ", " + (r_scale(d[2])) + ")";
					});

    		});