function getCurrent() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    loadLocalStorageItems()
}

function fetchAll(url, current = false) {
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var div = document.createElement('div');
                    div.classList.add('city-block');
                    // var wtemp = document.getElementsByClassName("temp_display");
                    // var weather = document.getElementsByClassName("weather_display");
                    // var location = document.getElementsByClassName("location_display");

                    var city = "<h2 class='heading_scnd'>" + data.name + "</h2>";
                    var temp = "<h2 class='heading_scnd'> temperture: " + data.main.temp + "°C" + "</h2>";
                    var loc = "<p class='paragraph'> coordinaten: " + data.coord.lat + ", " + data.coord.lon + "</p>";


                    div.innerHTML += temp;
                    div.innerHTML += city;
                    div.innerHTML += loc;

                    if (current) {
                        var wtemp = document.getElementsByClassName("temp_display");
                        var weather = document.getElementsByClassName("weather_display");
                        var location = document.getElementsByClassName("location_display");

                        weather[0].innerHTML += temp;
                        wtemp[0].innerHTML += city;
                        location[0].innerHTML += loc;

                        return;
                    }

                    return render(div);
                });
            } else {
                console.log("response failed");
            }
        });
}

function showPosition(position) {
    t = position.coords.latitude;
    n = position.coords.longitude;

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + t + '&lon=' + n + '&appid=d518e802e2b3693fb0123bb620f7d420&units=metric';
    fetchAll(url, true);

}

function render(element) {
    return document.body.appendChild(element);
}

function getLocation() {
    document.querySelector('.button').addEventListener("click", function () {
        var value = document.querySelector(".add-city").value;
        // document.querySelector(".test").append(value);
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + value + '&appid=d518e802e2b3693fb0123bb620f7d420&units=metric';
        console.log(url);
        fetchAll(url);
        saveLocalStorageItem(value)
    });
}

// Save the city name to the localStorage
function saveLocalStorageItem(value) {
    // Get the current weateritems
    let weatheritem = JSON.parse(localStorage.getItem('cityName'));
    // If there is no weatheritems, create new Array
    if (!weatheritem) {
        weatheritem = [];
    }
    // Add the cityname to the array
    weatheritem.push(value);
    // Set the item
    localStorage.setItem('cityName', JSON.stringify(weatheritem));
}
function loadLocalStorageItems() {
    // Get the weatheritems
    const weatheritem = JSON.parse(localStorage.getItem('cityName'));
    // If there are no weatheritems, do nothing
    if (!weatheritem) {
        return false;
    }
    // Do something for each item
    weatheritem.forEach(function(value) {
        // Call the API to get the data
        const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + value + '&appid=d518e802e2b3693fb0123bb620f7d420&units=metric';
            // Call the fetch to generate Added weather based on the data
            fetchAll(url);
    });
}

getCurrent();
getLocation();
