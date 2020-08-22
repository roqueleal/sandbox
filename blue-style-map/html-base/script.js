     // create map.
mapboxgl.accessToken = 'pk.eyJ1IjoidmlzdGNvbXVuaWNhY2lvbiIsImEiOiJja2Nyc3ZiYzQxaTJ4MnFzNXBpMG5iZno2In0.9bPy87fQMJpOmV2sJ_AYWQ';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/vistcomunicacion/cke549d0e03vd19qe4i1ii93t',
        center: [-46.658936,-23.543845],
        zoom: 3
    });
     // Add geocoder controls to the map.
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
    );
     // Add geolocate controls to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
            fitBoundsOptions: {
                zoom: 15,
            },
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
       })
     );
     // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl());
    //zomm