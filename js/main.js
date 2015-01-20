// making spotify playlist when form is submitted regardless of button clicked
var template = Handlebars.compile($("#spotify-template").html());

var lat = currentPosition.coords.latitude;
var long = currentPosition.coords.longitude;

var option = [];

var search = function(lat,long){
    userLocation = encodeURIComponent(userLocation);
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat +  '&lon=' + long + '&callback=?';
        $.getJSON(url, function(response) { //can use $ or jQuery
        //console.log(response);
        //arrayLength = response.objects.length;
        //var html = '';

        for (var i = 0; i < response.weather.length; i++) {

            option.push(response.weather[i].description);
           
        }



    });
};

var makePlaylist= function(searchkey){
    var artistId = encodeURIComponent(searchkey);
    var promise = $.ajax({
        url: 'https://api.spotify.com/v1/search?q=' + albumID + '&type=album',
        data: {
            searchkey: artistId
        },
        type: 'GET',
        dataType: 'json'
    }).done(function(response){
            
            var html  = template(response.album.items[0]);
            $('#spotify-results').html(html);
    });

    return promise;
}
