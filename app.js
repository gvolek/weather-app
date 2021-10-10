function getweatherforecast(coordinates) {
  //console.log(coordinates);
  let apiKey = "8b2194a8687d081654f1ef7f23c1a526";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  //console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#CurrentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  FTemp = response.data.main.temp;
  getweatherforecast(response.data.coord);
}
function EnterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  let apiKey = "8b2194a8687d081654f1ef7f23c1a526";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}
let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", EnterCity);

function showdegreesC(event) {
  event.preventDefault();
  degreesC.classList.add("active");
  degreesF.classList.remove("active");
  let CTemp = ((FTemp - 32) * 5) / 9;
  let CurrentTemp = document.querySelector("#CurrentTemp");
  CurrentTemp.innerHTML = Math.round(CTemp);
}
function showdegreesF(event) {
  event.preventDefault();
  degreesC.classList.remove("active");
  degreesF.classList.add("active");
  CurrentTemp.innerHTML = Math.round(FTemp);
}
let FTemp = null;
let degreesC = document.querySelector("#degreesC");
degreesC.addEventListener("click", showdegreesC);
let degreesF = document.querySelector("#degreesF");
degreesF.addEventListener("click", showdegreesF);

function findPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "8b2194a8687d081654f1ef7f23c1a526";
  let apiCoordsUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
  axios.get(apiCoordsUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

function CurrentDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let CurrentDate = document.querySelector("#CurrentDate");
  CurrentDate.innerHTML = `${day} ${hours}:${minutes}`;
}
function displayForecast(response) {
  console.log(response.data);
  let weatherforecast = document.querySelector("#weather-forecast");
  let weatherforecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    weatherforecastHTML =
      weatherforecastHTML +
      `
       <div class="col-2">
        <div class="DayOfTheWk">${day}</div>
        <img src="http://openweathermap.org/img/wn/50d@2x.png" width="50"/>
        <div class="Temperature-Max">25°F</div>
        <div class="Temperature-Min">20°F</div>
       </div>`;
  });
  weatherforecastHTML = weatherforecastHTML + `</div >`;
  weatherforecast.innerHTML = weatherforecastHTML;
}
CurrentDate();
