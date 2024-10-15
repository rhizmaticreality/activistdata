
const layerId = 'activist data Layer';
const activistDataSource = 'activist data source';

function addLayers(data) {
    
    addClusters();
    
    map.on('click', layerId, function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = `
        <h3>${e.features[0].properties.Title}</h3>
        <h4><em>${e.features[0].properties.Date}</em></h4>
        <h4><b>${e.features[0].properties.Address}</b></h4>
        <h4>${e.features[0].properties.Description}</h4>
        <h4><a href='${e.features[0].properties.Link}'>${e.features[0].properties.Hyperlink}</a></h4>
      `;
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    map.on('mouseenter', layerId, function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', layerId, function () {
        map.getCanvas().style.cursor = '';
    });

    var bbox = turf.bbox(data);
    map.fitBounds(bbox, { padding: 50 });
};

function addClusters() {
    // Add clustered layer
    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: activistDataSource,
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#7851B7',
                5,
                '#633E9E',
                10,
                '#412272'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                5,
                30,
                10,
                40
            ]
        }
    });

    // Add cluster counts
    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: activistDataSource,
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        },
        paint: {
            'text-color': 'white'
        }
    });
};

function makeGeoJSON(csvData) {
    csv2geojson.csv2geojson(csvData, {
        latfield: 'Latitude',
        lonfield: 'Longitude',
        delimiter: ','
    }, function (err, geojson) {
        
        olivesOriginalData = geojson; // Store original data
        
        // Add GeoJSON source with clustering
        map.addSource(activistDataSource, {
            type: 'geojson',
            data: geojson,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50
        });

        map.on('load', function () {
            addLayers(geojson);
        });


    });
};

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: 'https://docs.google.com/spreadsheets/d/1ndX6vrM9q-7rDKZ1j8_X2fWuhO3pVHHKJQGnw8jXCqU/gviz/tq?tqx=out:csv&sheet=Sheet1',
        dataType: "text",
        success: function (csvData) {
            makeGeoJSON(csvData);
        }
    });
});
