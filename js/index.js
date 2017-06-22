var jsonData = {
"heatmap": {
	"binSize": 3,
	"units": "\u00B0C",
	"map": [
		{"x": 11.6, "y": 8.3, "value": 20.2}
		
		]
	},
"overlays": {
	"polygons": [
		{"id": "p1", "name": "kitchen", "points": [{"x":2.513888888888882,"y":8.0},
												   {"x":6.069444444444433,"y":8.0},
												   {"x":6.069444444444434,"y":5.277535934291582},
												   {"x":8.20833333333332,"y":2.208151950718685},
												   {"x":13.958333333333323,"y":2.208151950718685},
												   {"x":16.277777777777825,"y":5.277535934291582},
												   {"x":16.277777777777803,"y":10.08151950718685},
												   {"x":17.20833333333337,"y":10.012135523613962},
												   {"x":17.27777777777782,"y":18.1387679671458},
												   {"x":2.513888888888882,"y":18.0}]}
		]
	},
"vectorfield": {
	"binSize": 3,
	"units": "ft/s",
	"map": [
		{"x": 18, "y": 21, "value": {"x": 4, "y": 3}},
		{"x": 21, "y": 21, "value": {"x": 3, "y": 3}},
		{"x": 18, "y": 24, "value": {"x": 1, "y": 2}},
		{"x": 21, "y": 24, "value": {"x": -3, "y": 4}},
		{"x": 24, "y": 24, "value": {"x": -4, "y": 1}}]
	},
"pathplot": [{
	"id": "flt-1",
	"classes": "planned",
	"points": [{"x": 28.8, "y": 34.6},{"x": 28.8, "y": 29.7},{"x": 30.9, "y": 29.7},
	{"x": 30.9, "y": 18.3},{"x": 11.6, "y": 18.3},{"x": 11.6, "y": 10.3},
	{"x": 11.6, "y": 9.3}]
	}]
};

var xscale = d3.scale.linear()
               .domain([0,50.0])
               .range([0,720]),
    yscale = d3.scale.linear()
               .domain([0,33.79])
               .range([0,487]),
    map = d3.floorplan().xScale(xscale).yScale(yscale),
    imagelayer = d3.floorplan.imagelayer(),
    heatmap = d3.floorplan.heatmap(),
    vectorfield = d3.floorplan.vectorfield(),
    pathplot = d3.floorplan.pathplot(),
    overlays = d3.floorplan.overlays().editMode(false),
    mapdata = {};

mapdata[imagelayer.id()] = [{
    url: 'dell8thfloor.png',
    x: 0,
    y: 0,
    height:50.79,
    width: 75.0
     }];

map.addLayer(imagelayer)
   .addLayer(vectorfield)
   .addLayer(pathplot)
  // .addLayer(overlays);
  .addLayer(heatmap);

var loadData = function(data) {
	mapdata[heatmap.id()] = data.heatmap;
	mapdata[overlays.id()] = data.overlays;
	mapdata[vectorfield.id()] = data.vectorfield;
	mapdata[pathplot.id()] = data.pathplot;
	
	d3.select("#demo").append("svg")
		.attr("height", 687).attr("width",900)
		.datum(mapdata).call(map);
};

loadData(jsonData);
$('.map-controls').css("display","none");
//layer-controls
//$('.layer-controls').css("display","none");map-controls
//https://dciarletta.github.io/d3-floorplan/Sample_Floorplan.jpg