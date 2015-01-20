var map;
var currentPosition;

function initialize() {
    

    
    var mapOptions = {
        zoom: 8,
        styles: [{
            'featureType': 'water',
            'stylers': [{
                'visibility': 'on'
            }, {
                'color': '#acbcc9'
            }]
        }, {
            'featureType': 'landscape',
            'stylers': [{
                'color': '#f2e5d4'
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#c5c6c6'
            }]
        }, {
            'featureType': 'road.arterial',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#e4d7c6'
            }]
        }, {
            'featureType': 'road.local',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#fbfaf7'
            }]
        }, {
            'featureType': 'poi.park',
            'elementType': 'geometry',
            'stylers': [{
                'color': '#c5dac6'
            }]
        }, {
            'featureType': 'administrative',
            'stylers': [{
                'visibility': 'on'
            }, {
                'lightness': 33
            }]
        }, {
            'featureType': 'road'
        }, {
            'featureType': 'poi.park',
            'elementType': 'labels',
            'stylers': [{
                'visibility': 'on'
            }, {
                'lightness': 20
            }]
        }, {}, {
            'featureType': 'road',
            'stylers': [{
                'lightness': 20
            }]
        }]
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                position.coords.longitude);
            currentPosition = position;
            console.log(currentPosition.coords.latitude);
            var geocoder = new google.maps.Geocoder();

            geocoder.geocode({
                location: pos
            }, function(results) {
                console.log(results[0].formatted_address);
                var infowindow = new google.maps.InfoWindow({
                    //map: map,
                    position: pos,
                    content: 'Your location is ' + results[0].formatted_address
                });

                var marker = new google.maps.Marker({
                    map: map,
                    position: pos,
                    animation: google.maps.Animation.DROP,
                    icon: 'beer.png'
                });

                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map);
                });

            });


            map.setCenter(pos);
        }, function() {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }


    map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);