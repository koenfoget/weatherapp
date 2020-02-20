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
                    let div = document.createElement('div');
                    div.classList.add('city-block');

                    let btn = document.createElement('button');
                    btn.classList.add('delete');
                    btn.setAttribute('data-key', data.name);

                    btn.innerHTML = "Delete";

                    let city = "<h2 class='heading_scnd'>" + data.name + "</h2>";
                    let temp = "<h2 class='heading_scnd'> temperture: " + data.main.temp + "°C" + "</h2>";
                    let loc = "<p class='paragraph'> coordinaten: " + data.coord.lat + ", " + data.coord.lon + "</p>";

                    div.innerHTML += temp;
                    div.innerHTML += city;
                    div.innerHTML += loc;

                    if (current) {

                        let wtemp = document.getElementsByClassName("temp_display");
                        let weather = document.getElementsByClassName("weather_display");
                        let location = document.getElementsByClassName("location_display");

                        weather[0].innerHTML += temp;
                        wtemp[0].innerHTML += city;
                        location[0].innerHTML += loc;

                        return;
                    }

                    btn.addEventListener("click", function (e){

                        let weatheritem = JSON.parse(localStorage.getItem('cityName'));
                        weatheritem = weatheritem.filter((item) => {
                            console.log(item !== e.target.getAttribute('data-key'));
                            return item !== e.target.getAttribute('data-key').toLowerCase();
                        });

                        localStorage.setItem('cityName', JSON.stringify(weatheritem));
                    });

                    div.appendChild(btn);

                    return render(div);
                });
            } else {
                console.log("response failed");
            }
        });
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=d518e802e2b3693fb0123bb620f7d420&units=metric';
    fetchAll(url, true);

}

function render(element) {
    return document.body.appendChild(element);
}

function getLocation() {
    document.querySelector('.button').addEventListener("click", function () {
        let value = document.querySelector(".add-city").value;
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
    weatheritem.push(value.toLowerCase());
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
