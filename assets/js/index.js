function getCurrent() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function fetchAll(url) {
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var wtemp = document.getElementsByClassName("temp_display");
                    var weather = document.getElementsByClassName("weather_display");
                    var location = document.getElementsByClassName("location_display");

                    var city = "<h2 class='heading_scnd'>" + data.name + "</h2>";
                    var temp = "<h2 class='heading_scnd'> temperture: " + data.main.temp + "°C" + "</h2>";
                    var loc = "<p class='paragraph'> coordinaten: " + data.coord.lat + ", " + data.coord.lon + "</p>";


                    weather[0].innerHTML += temp;
                    wtemp[0].innerHTML += city;
                    location[0].innerHTML += loc;
                });
            } else {
                console.log("response failed");
            }
        });
}

function showPosition(position) {
    t = position.coords.latitude;
    n = position.coords.longitude;

    const url='http://api.openweathermap.org/data/2.5/weather?lat=' + t + '&lon=' + n + '&appid=d518e802e2b3693fb0123bb620f7d420&units=metric';
    fetchAll(url);

}


function getLocation() {
    document.querySelector('.button').addEventListener("click", function () {
        var city = document.querySelector('.add-city').value;
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=d518e802e2b3693fb0123bb620f7d420&units=metric';
        console.log(url);
        fetchAll(url);
    });
}



getCurrent();
getLocation();
