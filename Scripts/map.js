
var osmLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
});

var layer1 = createGeoJsonLayer('lib/Cat1.json', 'Layer 1', 'rgba(255, 0, 0, 0.1)', 'red');
var layer2 = createGeoJsonLayer('lib/Cat2.json', 'Layer 2', 'rgba(0, 0, 255, 0.1)', 'gray');
var layer3 = createGeoJsonLayer('lib/OZP_AGR.json', 'Layer 3', 'rgba(0, 0, 255, 0.1)', 'green');
var layer4 = createGeoJsonLayer('lib/OZP_CA.json', 'Layer 4', 'rgba(0, 0, 255, 0.1)', 'blue');
var layer5 = createGeoJsonLayer('lib/Buildings.json', 'Layer 5', 'rgba(0, 0, 255, 0.1)', 'Yellow');
var layer6 = createGeoJsonLayer('lib/Lot1.json', 'Layer 6', 'rgba(0, 0, 255, 0.1)', 'orange');
var layer7 = createGeoJsonLayer('lib/Lot2.json', 'Layer 7', 'rgba(0, 0, 255, 0.1)', 'orange');
var layer8 = createGeoJsonLayer('lib/Lot3.json', 'Layer 8', 'rgba(0, 0, 255, 0.1)', 'orange');
var layer9 = createGeoJsonLayer('lib/Lot4.json', 'Layer 9', 'rgba(0, 0, 255, 0.1)', 'orange');
var layer10 = createGeoJsonLayer('lib/Lot5.json', 'Layer 10', 'rgba(0, 0, 255, 0.1)', 'orange');

var map = new ol.Map({
    target: 'map',
    layers: [osmLayer, layer1, layer2, layer3, layer4, layer5, layer6, layer7, layer8, layer9, layer10],
    view: new ol.View({
        center: ol.proj.fromLonLat([114.1694, 22.3193]),
        zoom: 10,
    }),
});


layer1.setVisible(false);
layer2.setVisible(false);
layer3.setVisible(false);
layer4.setVisible(false);
layer5.setVisible(false);
layer6.setVisible(false);
layer7.setVisible(false);
layer8.setVisible(false);
layer9.setVisible(false);
layer10.setVisible(false);

function createGeoJsonLayer(url, title, fillColor, strokeColor) {
    return new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: url,
        }),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: fillColor,
            }),
            stroke: new ol.style.Stroke({
                color: strokeColor,
                width: 2,
            }),
        }),
        title: title,
    });
}

// Create legend
const legend = document.getElementById('legend');

// Function to add legend for a layer
function addLegend(title, color) {
    const legendItem = document.createElement('div');
    legendItem.innerHTML = `<span style="background-color: ${color}; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></span>${title}`;
    legend.appendChild(legendItem);
}

// Add legends for each raster layer
// Replace 'Layer 1', 'Layer 2', ... with your layer names
// Replace 'red', 'blue', ... with your layer colors
addLegend('CAT2', 'red');
addLegend('CATGEO1', 'blue');
addLegend('OZP_AGR', 'green');
addLegend('OZP_CA', 'orange');
addLegend('BUILDINGS', 'yellow');
addLegend('LOT', 'pink');
    // Add legends for additional layers as needed

// Function to create GeoJSON layer
function createGeoJsonLayer(url, title, fillColor, strokeColor) {
    return new ol.layer.Vector({
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: url,
        }),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: fillColor,
            }),
            stroke: new ol.style.Stroke({
                color: strokeColor,
                width: 2,
            }),
        }),
        title: title,
    });
}

// Add click event to the map
map.on('click', function (event) {
    var feature = map.forEachFeatureAtPixel(event.pixel, function (feature) {
        return feature;
    });

    if (feature != undefined) {
        var properties = feature.getProperties();
        var Table = document.getElementById('table');
        Table.classList.add('active');

        let table = document.getElementById('infoTable')
        if (table.innerHTML != '') {
            table.innerHTML = '';
        }
        //  create rows of table 
        for (let key in properties) {
            if (key !== 'geometry') {
                let createTr = document.createElement("tr");
                createTr.innerHTML = "<th>" + key + "</th><td>" + properties[key] + "</td>";
                table.appendChild(createTr);
            }
        }





    }
    if (feature == undefined) {
        document.getElementById('table').classList.remove('active');
    }
});

var tableBtn = document.getElementById('tableBtn');
tableBtn.onclick = function () {
    document.getElementById('table').classList.remove('active');
};

// Layer visibility control
function toggleLayer(layer, checkbox) {
    layer.setVisible(checkbox.checked);

    // Zoom to the extent of the specific layer
    if (checkbox.checked) {
        var extent = layer.getSource().getExtent();
        map.getView().fit(extent, map.getSize());
    }

}

document.getElementById('osmCheckbox').addEventListener('change', function () {
    toggleLayer(osmLayer, this);
});

document.getElementById('layer1Checkbox').addEventListener('change', function () {
    toggleLayer(layer1, this);
});

document.getElementById('layer2Checkbox').addEventListener('change', function () {
    toggleLayer(layer2, this);
});

document.getElementById('layer3Checkbox').addEventListener('change', function () {
    toggleLayer(layer3, this);
});

document.getElementById('layer4Checkbox').addEventListener('change', function () {
    toggleLayer(layer4, this);
});

document.getElementById('layer5Checkbox').addEventListener('change', function () {
    toggleLayer(layer5, this);
});

document.getElementById('layer6Checkbox').addEventListener('change', function () {
    toggleLayer(layer6, this);
});

document.getElementById('layer7Checkbox').addEventListener('change', function () {
    toggleLayer(layer7, this);
});

document.getElementById('layer8Checkbox').addEventListener('change', function () {
    toggleLayer(layer8, this);
});

document.getElementById('layer9Checkbox').addEventListener('change', function () {
    toggleLayer(layer9, this);
});

document.getElementById('layer10Checkbox').addEventListener('change', function () {
    toggleLayer(layer10, this);
});