let latitude, longitude;
let destination;

$(document).ready(function () {
    alert("The program will not work if you don't click accept")
    initGeolocation();
})

$(function () {
    $("#navigate-button").click(function () {
        window.location.href = `ar_navigation.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
    })
})

function initGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    }
    else {
        alert("There is a problem with your browser");
    }
}

function success(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude

    mapboxgl.accessToken = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 16
    });
    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );
    map.on('click', function (e) {
        destination = e.lngLat;
    });
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );
    var img1= document.querySelector("./image.jfif")
    var marker1=new mapboxgl.Marker({ element: img1 }) .setLngLat([0.0 , 0.0]) .addTo(mapVariable)
    setTimeout(function () {
        $(".mapboxgl-ctrl-icon").click()
    }, 3000)
}