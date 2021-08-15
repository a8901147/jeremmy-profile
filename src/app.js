const path = require("path");
const express = require("express");
const hbs = require("hbs");
const getWeatherInfo = require("./weather-app/index.js");
const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("", {
    title: "About Me",
    name: "Jeremmy",
  });
});

app.get("/getWeatherInfo", async (req, res) => {
  console.log("/getWeatherInfo");
  if (!req.query.cityName) {
    return res.send({
      location: "You must provide an address!",
      weather: "",
    });
  }
  const weatherInfo = await getWeatherInfo(req.query.cityName);
  return res.send({
    location: weatherInfo.location,
    weather: weatherInfo.forecastData,
  });
});

app.get("/weather", async (req, res) => {
  console.log("/weather");
  res.render("weather", {
    title: "Weather",
    name: "Jeremmy",
    //location: weatherInfo.location,
    //weather: weatherInfo.forecastData,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Jeremmy",
  });
});

// app.get("/weatherApi", (req, res) => {
//   res.send({
//     forecast: "It is snowing",
//     location: "Philadelphia",
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jeremmy",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jeremmy",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
