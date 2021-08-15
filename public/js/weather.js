const $weatherForm = document.querySelector("#form-weather");
const $txtLocation = $weatherForm.querySelector("input");
const $lbLocation = $weatherForm.querySelector("#location");
const $lbWeather = $weatherForm.querySelector("#weather");

$weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = $txtLocation.value;

  $lbLocation.textContent = "Loading...";
  $lbWeather.textContent = "";

  fetch("/getWeatherInfo?cityName=" + location)
    .then((response) => response.json())
    .then((data) => {
      $lbLocation.textContent = data.location;
      $lbWeather.textContent = data.weather;
    })
    .catch((e) => console.log(e));
});
