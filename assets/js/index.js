function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    t = position.coords.latitude;
    n = position.coords.longitude;

    const url='http://api.openweathermap.org/data/2.5/weather?lat=' + t + '&lon=' + n + '&appid=d518e802e2b3693fb0123bb620f7d420&units=metric';

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var weather = document.getElementsByClassName("weather_display");
                    var wtemp = document.getElementsByClassName("temp_display");
                    var location = document.getElementsByClassName("location_display");

                    var temp = "<p> temperture: " + data.main.temp + "°C" + "</p>";
                    var city = "<p> naam van stad: " + data.name + "</p>";
                    var loc = "<p> coordinaten: " + data.coord.lat + ", " + data.coord.lon + "</p>";


                    weather[0].innerHTML += temp;
                    wtemp[0].innerHTML += city;
                    location[0].innerHTML += loc;
                });
            } else {
                console.log("response failed");
            }
        });
}

getLocation();