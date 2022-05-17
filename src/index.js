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

// SEARCHBAR CLICK EVENT
let input = document.querySelector("#city");
let units = "imperial";
let apiKey = "ce488b4abdc5eaf9759b2ac9b9434934";
function makeFirstCallFromInput(event) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=${units}&exclude=minutely,hourly,alerts&APPid=${apiKey}`;
  fetch(apiUrl).then(function updateHeading(response) {
    if (response.status == 200) {
      axios.get(apiUrl).then(updateURL);
    } else {
      document.querySelector("h2").innerHTML = "CHECK CITY & TRY AGAIN";
    }
  });
  event.preventDefault();
}
let weatherCity = document.querySelector("form");
weatherCity.addEventListener("submit", makeFirstCallFromInput);

// updates temps based on city entered = city => coordinates => api call w/ forecast
function updateURL(response) {
  let latCoords = response.data.coord.lat;
  let lonCoords = response.data.coord.lon;
  document.querySelector("h2").innerHTML = response.data.name.toUpperCase();
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latCoords}&lon=${lonCoords}&exclude=minutely,hourly,alerts&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  showIcons(response);
  document.querySelector("#currentToday").innerHTML = `${Math.round(
    response.data.current.temp
  )}°`;
  document.querySelector("#highToday").innerHTML = `${Math.round(
    response.data.daily[0].temp.max
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

function showIcons(response) {
  let icon1 = response.data.daily[0].weather[0].icon[0];
  let icon2 = response.data.daily[0].weather[0].icon[1];
  iconURL = `https://openweathermap.org/img/wn/${icon1}${icon2}n.png`;
  document.getElementById("tomoIcon").src = iconURL;

  icon1 = response.data.daily[1].weather[0].icon[0];
  icon2 = response.data.daily[1].weather[0].icon[1];
  iconURL = `https://openweathermap.org/img/wn/${icon1}${icon2}n.png`;
  document.getElementById("nextIcon").src = iconURL;

  icon1 = response.data.daily[2].weather[0].icon[0];
  icon2 = response.data.daily[2].weather[0].icon[1];
  iconURL = `https://openweathermap.org/img/wn/${icon1}${icon2}n.png`;
  document.getElementById("followIcon").src = iconURL;

  icon1 = response.data.daily[3].weather[0].icon[0];
  icon2 = response.data.daily[3].weather[0].icon[1];
  iconURL = `https://openweathermap.org/img/wn/${icon1}${icon2}n.png`;
  document.getElementById("lastIcon").src = iconURL;
}

// CELSIUS TOGGLE CLICK EVENT
let lat = null;
let long = null;
function toggleSwitchClick() {
  let inputSwitch = document.querySelector(".form-check-input");
  let cssOfToggle = window.getComputedStyle(inputSwitch);

  if (cssOfToggle.backgroundColor === `rgb(13, 110, 253)`) {
    // console.log("this is the if end");
    showCelsius();
  } else {
    // console.log("this is the else end");
    showImperial();
  }
}
document
  .querySelector(".form-check-input")
  .addEventListener("click", toggleSwitchClick);

function showCelsius() {
  units = "metric";
  if (document.querySelector("h2").innerHTML === "TODAY") {
    units = "metric";
    geoFetch();
  } else {
    input = document.querySelector("h2").innerHTML;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${units}&exclude=minutely,hourly,alerts&APPid=${apiKey}`;
    axios.get(apiUrl).then(updateURL);
  }
}

function showImperial() {
  units = "imperial";
  if (document.querySelector("h2").innerHTML === "TODAY") {
    units = "imperial";
    geoFetch();
  } else {
    input = document.querySelector("h2").innerHTML;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=${units}&exclude=minutely,hourly,alerts&APPid=${apiKey}`;
    axios.get(apiUrl).then(updateURL);
  }
}

// END OF CELSIUS TOGGLE

// displays current location's temps on click
function fetchCurrentPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&units=${units}&appid=${apiKey}`;
  axios.get(url).then(pullCoords);

  function pullCoords(response) {
    document.querySelector("h2").innerHTML = "TODAY";
    showTemperature(response);
  }
}
// can't get celsius button to work when location is pulled and "today" is h2 - can you use lat/lon to display geoFetch city ? instead of "today" ?
function geoFetch() {
  navigator.geolocation.getCurrentPosition(fetchCurrentPosition);
}
document.querySelector("#current-location").addEventListener("click", geoFetch);

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

// Displays weather for Nashville on load
apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=36.174465&lon=-86.767960&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`;
axios.get(apiUrl).then(showTemperature);
