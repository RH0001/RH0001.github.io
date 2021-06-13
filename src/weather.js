const weather = document.querySelector(".js-weather");

const COORDS='coords';
const API_KEY = "84a8e37bcac06c27bc9a3e074a54d499";


function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @${place}`;
    })
}

function saveGeo(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }

    saveGeo(coordsObj);
    
}

function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCodes(params) {
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null) {
        askForCoords();
    } else {
        //getWeather
        const parseCoords = JSON.parse(loadedCords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}
function init() {
    loadCodes();
}

init();