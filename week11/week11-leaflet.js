
var map = L.map('map').setView([45.68, -111.05], 13);
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
   		'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	attribution: '&copy; ' + mapLink + ' Contributors',
    	maxZoom: 18,
    })
	.addTo(map);

// adding a circle over MSU
var circle = L.circle([45.66757, -111.0494], 450, {
    	color: 'red',
    	fillColor: '#f03',
    	fillOpacity: 0.5
	})
	.addTo(map)
	.bindPopup("Montana State University")
	.openPopup();

// adding a popup for wilson hall
var marker = L.marker([45.66842, -111.0484])
	.addTo(map)
	.bindPopup("Wilson Hall");
