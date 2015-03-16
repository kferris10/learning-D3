//parameters
		var w = 500;
		var h = 500;
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
		var xScale = d3.scale.linear()
							 .domain([d3.min(dataset, function(d) { return d[0]; }), 
							 		  d3.max(dataset, function(d) { return d[0];} )])
							 .range([padding+3, w-padding])
							 .nice();
		var yScale = d3.scale.linear()
							 .domain([d3.min(dataset, function(d) { return d[1]; }), 
							 		  d3.max(dataset, function(d) { return d[1]; })])
							 .range([h-padding, padding])
							 .nice();
		var rScale = d3.scale.linear()
							 .domain([d3.min(dataset, function(d) { return d[2]; }), 
							 		  d3.max(dataset, function(d) { return d[2]; })])
							 .range([0, 20]);

		// axes
		var xAxis = d3.svg.axis()
						  .scale(xScale)
			 			  .orient("bottom")
			 			  .ticks(5);
		var yAxis = d3.svg.axis()
						  .scale(yScale)
						  .orient("left")
						  .ticks(5);

		//drawing the plot
		var svg = d3.select("body").select("#week3-scatter")
					.append("svg")
					.attr("width", w)
					.attr("height", h);
		var circles = svg.selectAll("circle")
						.data(dataset)
						.enter()
						.append("circle");
		circles.attr("cx", function(d) {
					return xScale(d[0]);
		})
				.attr("cy", function(d) {
					return yScale(d[1]);
				})
				.attr("r", function(d) { 
					return rScale(d[2]); 
				})
				.attr("fill", "teal")
				.attr("stroke", "orange");

		// adding axes
		svg.append("g")
		   .attr("class", "axis")
		   .attr("transform", "translate(0," + (h - padding) + ")")
		   .call(xAxis);
		svg.append("g")
		   .attr("class", "axis")
		   .attr("transform", "translate(" + padding + ", 0)")
		   .call(yAxis);

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