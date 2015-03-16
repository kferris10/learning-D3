var svg = d3.select("body")
	.select("#week2-spiral")
	.append("svg");
		//var dataset = [5, 10, 15, 20, 25];
		var w = 625;
		var h = 625;
		var theta = [0, 
			Math.PI/6, Math.PI/3, Math.PI/2, 
			2/3*Math.PI, 5/6*Math.PI, Math.PI, 
			7/6*Math.PI, 8/6*Math.PI, 3/2*Math.PI, 
			10/6*Math.PI, 11/6*Math.PI, 2*Math.PI, 
			Math.PI/6, Math.PI/3, Math.PI/2, 
			2/3*Math.PI, 5/6*Math.PI, Math.PI, 
			7/6*Math.PI, 8/6*Math.PI, 3/2*Math.PI, 
			10/6*Math.PI, 11/6*Math.PI, 2*Math.PI, 
			Math.PI/6, Math.PI/3, Math.PI/2, 
			2/3*Math.PI, 5/6*Math.PI, Math.PI, 
			7/6*Math.PI, 8/6*Math.PI, 3/2*Math.PI, 
			10/6*Math.PI, 11/6*Math.PI, 2*Math.PI, 
			Math.PI/6, Math.PI/3, Math.PI/2, 
			2/3*Math.PI, 5/6*Math.PI, Math.PI, 
			7/6*Math.PI, 8/6*Math.PI, 3/2*Math.PI, 
			10/6*Math.PI, 11/6*Math.PI, 2*Math.PI];
		svg.attr("width", w)
			.attr("height", h);
		var circles = svg.selectAll("circle")
						 .data(theta)
						 .enter()
						 .append("circle");
		circles.attr("cx", function(d, i) {
						return w/2 + 5*i * Math.cos(d);
					})
				.attr("cy", function(d, i) {
						return h/2 + 5*i * Math.sin(d);
					})
				.attr("r", function(d, i) {
						return Math.log(i)*Math.log(i)*Math.log(i);
					})
				.attr("fill", "red")
				.attr("stroke", "blue")
				.attr("stroke-width", function(d, i) {
						return Math.log(i)*Math.log(i);
					});