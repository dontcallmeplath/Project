let now = new Date();
currentTime();
updateDayNames();

// establishes current day
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
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const now = new Date(); // Ensure 'now' is defined
    const currentDay = now.getDay();
    const elements = ["#firstDay", "#secondDay", "#thirdDay", "#fourthDay"];

    // Iterate through the next 4 days
    elements.forEach((selector, index) => {
      const dayIndex = (currentDay + index + 1) % 7;
      document.querySelector(selector).innerHTML = days[dayIndex];
    });
  }
}

// establishes current time of day
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
  let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=${apiKey}`;

  axios.get(apiUrl).then(function updateHeading(response) {
    if (response.headers["content-length"] > 2 && response.status == 200) {
      updateURL(response);
      input.value = "";
    } else {
      document.querySelector("h2").innerHTML = "CHECK CITY & TRY AGAIN";
      input.value = "";
    }
  });
  event.preventDefault();
}
let weatherCity = document.querySelector("form");
weatherCity.addEventListener("submit", makeFirstCallFromInput);

// updates temps based on city entered = city => coordinates => api call w/ forecast
function updateURL(response) {
  let latCoords = response.data[0].lat;
  let lonCoords = response.data[0].lon;
  document.querySelector("h2").innerHTML = response.data[0].name.toUpperCase();
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latCoords}&lon=${lonCoords}&exclude=minutely,hourly,alerts&units=${units}&cnt=5&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

// displays the temps across the forecast
function showTemperature(response) {
  showIcons(response.data.list);

  let tempList = response.data.list;
  let highList = [];
  let lowList = [];

  const highTempSelectors = [
    "#highToday",
    "#tomoHigh",
    "#nextHigh",
    "#followHigh",
    "#lastHigh",
  ];

  const lowTempSelectors = [
    "#lowToday",
    "#tomoLow",
    "#nextLow",
    "#followLow",
    "#lastLow",
  ];

  for (let i = 0; i < tempList.length; i++) {
    highList.push(Math.round(tempList[i].main.temp_max));
  }

  for (let i = 0; i < tempList.length; i++) {
    lowList.push(Math.round(tempList[i].main.temp_min));
  }

  document.querySelector("#currentToday").innerHTML = `${Math.round(
    tempList[0].main.temp
  )}°`;

  highTempSelectors.forEach((selector, index) => {
    document.querySelector(selector).innerHTML = `${highList[index]}°`;
  });

  lowTempSelectors.forEach((selector, index) => {
    document.querySelector(selector).innerHTML = `${lowList[index]}°`;
  });
}

// displays the icons associated with the weather
function showIcons(list) {
  let icons = [];
  const elements = ["tomoIcon", "nextIcon", "followIcon", "lastIcon"];

  for (let i = 1; i < list.length; i++) {
    icons.push(list[i].weather[0].icon);
  }

  elements.forEach((element, index) => {
    iconURL = `https://openweathermap.org/img/wn/${icons[index]}.png`;
    document.getElementById(element).src = iconURL;
  });
}

// CELSIUS TOGGLE CLICK EVENT - updates temp units displayed
let lat = null;
let long = null;
function toggleSwitchClick() {
  let inputSwitch = document.querySelector(".form-check-input");
  let cssOfToggle = window.getComputedStyle(inputSwitch);

  if (cssOfToggle.backgroundColor === `rgb(13, 110, 253)`) {
    showCelsius();
  } else {
    showImperial();
  }
}
document //click event for the toggle --
  .querySelector(".form-check-input")
  .addEventListener("click", toggleSwitchClick);

function showCelsius() {
  units = "metric";
  if (document.querySelector("h2").innerHTML === "NASHVILLE") {
    units = "metric";
    geoFetch();
  } else {
    // input = document.querySelector("#city");
    let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=${apiKey}`;
    axios.get(apiUrl).then(updateURL);
  }
}

https: function showImperial() {
  units = "imperial";
  if (document.querySelector("h2").innerHTML === "NASHVILLE") {
    units = "imperial";
    geoFetch();
  } else {
    // input = document.querySelector("#city");
    let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=1&appid=${apiKey}`;
    axios.get(apiUrl).then(updateURL);
  }
}
// END OF CELSIUS TOGGLE

// displays current location's temps on click
function fetchCurrentPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&exclude=minutely,hourly,alerts&units=${units}&cnt=5&appid=${apiKey}`;
  axios.get(url).then(pullCoords);

  function pullCoords(response) {
    document.querySelector("h2").innerHTML =
      response.data.city.name.toUpperCase();
    showTemperature(response);
  }
}

function geoFetch() {
  navigator.geolocation.getCurrentPosition(fetchCurrentPosition);
}
document.querySelector("#current-location").addEventListener("click", geoFetch);

// Displays weather for Nashville on load
apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=36.174465&lon=-86.767960&exclude=minutely,hourly,alerts&units=${units}&cnt=5&appid=${apiKey}`;
axios.get(apiUrl).then(showTemperature);

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
