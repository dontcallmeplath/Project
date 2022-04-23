let now = new Date();
currentTime();
updateDayNames();

function updateDayNames() {
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  document.querySelector("#today").innerHTML = days[now.getDay()];
  trimDays();

  function trimDays() {
    let daysTrim = [
      "SUN",
      "MON",
      "TUE",
      "WED",
      "THU",
      "FRI",
      "SAT",
      "SUN",
      "MON",
      "TUE",
      "WED",
    ];
    document.querySelector("#firstDay").innerHTML = daysTrim[now.getDay() + 1];
    document.querySelector("#secondDay").innerHTML = daysTrim[now.getDay() + 2];
    document.querySelector("#thirdDay").innerHTML = daysTrim[now.getDay() + 3];
    document.querySelector("#fourthDay").innerHTML = daysTrim[now.getDay() + 4];
  }
}
function currentTime() {
  let hour = now.getHours();
  let currentHour = document.querySelector("#currentHour");
  let minutes = now.getMinutes();
  let currentMinutes = `${minutes}`;
  if (minutes < 10) {
    currentMinutes = `0${minutes}`;
  }
  overTwelveHour();
  function overTwelveHour() {
    let time = `${hour}:${currentMinutes} AM`;
    if (hour > 12 || hour === 0) {
      let hourTrim = hour - 12;
      let currentHour = document.querySelector("#currentHour");
      currentHour.innerHTML = `${hourTrim}:${currentMinutes} PM`;
      if (hourTrim === -12) {
        currentHour.innerHTML = `12:${currentMinutes} AM`;
      }
    } else {
      currentHour.innerHTML = `${time}`;
    }
  }
}
// displays current location's temps on click
function fetchCurrentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  function pullCoords(response) {
    document.querySelector("#highToday").innerHTML = `${Math.round(
      response.data.current.temp
    )}°`;
    document.querySelector("#lowToday").innerHTML = `${Math.round(
      response.data.daily[0].temp.min
    )}°`;
    document.querySelector("#tomoHigh").innerHTML = `${Math.round(
      response.data.daily[1].temp.max
    )}°`;
    document.querySelector("#nextHigh").innerHTML = `${Math.round(
      response.data.daily[2].temp.max
    )}°`;
    document.querySelector("#followHigh").innerHTML = `${Math.round(
      response.data.daily[3].temp.max
    )}°`;
    document.querySelector("#lastHigh").innerHTML = `${Math.round(
      response.data.daily[4].temp.max
    )}°`;
    document.querySelector("#tomoLow").innerHTML = `${Math.round(
      response.data.daily[1].temp.min
    )}°`;
    document.querySelector("#nextLow").innerHTML = `${Math.round(
      response.data.daily[2].temp.min
    )}°`;
    document.querySelector("#followLow").innerHTML = `${Math.round(
      response.data.daily[3].temp.min
    )}°`;
    document.querySelector("#lastLow").innerHTML = `${Math.round(
      response.data.daily[4].temp.min
    )}°`;
  }
  let apiKey = "ce488b4abdc5eaf9759b2ac9b9434934";
  let units = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&units=${units}&appid=${apiKey}`;
  axios.get(url).then(pullCoords);
}
function geoFetch() {
  navigator.geolocation.getCurrentPosition(fetchCurrentPosition);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", geoFetch);

// SEARCHBAR CLICK EVENT
let input = document.querySelector("#city");
let units = "imperial";
function makeFirstCallFromInput(event) {
  event.preventDefault();
  let apiKey = "ce488b4abdc5eaf9759b2ac9b9434934";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=${units}&exclude=minutely,hourly,alerts&APPid=${apiKey}`;
  document.querySelector("h1").innerHTML = input.value.toUpperCase();
  axios.get(apiUrl).then(updateURL);
  // updates temps based on city entered = city => coordinates => api call w/ forecast
  function updateURL(response) {
    let latCoords = response.data.coord.lat;
    let lonCoords = response.data.coord.lon;
    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latCoords}&lon=${lonCoords}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);

    function showTemperature(response) {
      document.querySelector("#highToday").innerHTML = `${Math.round(
        response.data.current.temp
      )}°`;
      document.querySelector("#lowToday").innerHTML = `${Math.round(
        response.data.daily[0].temp.min
      )}°`;
      document.querySelector("#tomoHigh").innerHTML = `${Math.round(
        response.data.daily[1].temp.max
      )}°`;
      document.querySelector("#nextHigh").innerHTML = `${Math.round(
        response.data.daily[2].temp.max
      )}°`;
      document.querySelector("#followHigh").innerHTML = `${Math.round(
        response.data.daily[3].temp.max
      )}°`;
      document.querySelector("#lastHigh").innerHTML = `${Math.round(
        response.data.daily[4].temp.max
      )}°`;
      document.querySelector("#tomoLow").innerHTML = `${Math.round(
        response.data.daily[1].temp.min
      )}°`;
      document.querySelector("#nextLow").innerHTML = `${Math.round(
        response.data.daily[2].temp.min
      )}°`;
      document.querySelector("#followLow").innerHTML = `${Math.round(
        response.data.daily[3].temp.min
      )}°`;
      document.querySelector("#lastLow").innerHTML = `${Math.round(
        response.data.daily[4].temp.min
      )}°`;
    }
  }
}
let weatherCity = document.querySelector("form");
weatherCity.addEventListener("submit", makeFirstCallFromInput);

// CELSIUS TOGGLE CLICK EVENT
function toggleSwitchClicks() {
  let countClicks = 0;
  countClicks += 1;
  if (countClicks % 2 !== 0) {
    showCelsius();
  } else if (countClicks % 2 === 0) {
    showImperial();
  }
}
let click = document.querySelector("#flexSwitch");
click.addEventListener("click", toggleSwitchClicks);

function showCelsius() {}

function showImperial() {}

// END OF CELSIUS TOGGLE
console.log("spam v for rave");
window.addEventListener("keydown", (event) => {
  if (event.key === "v") {
    document.body.style.background = "#E6BDF9";
  }
});
window.addEventListener("keyup", (event) => {
  if (event.key === "v") {
    document.body.style.background = "";
  }
});
