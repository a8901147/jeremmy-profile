const geocode = require("./geocode");
const forecast = require("./forecast");

const getWeatherInfo = async (address) => {
  if (!address) {
    return { location: "Please provide an address", forecastData: "" };
  } else {
    try {
      const coordinate = await geocode(address);
      const weatherInfo = await forecast(
        coordinate.latitude,
        coordinate.longitude
      );

      return { location: coordinate.location, forecastData: weatherInfo };
    } catch (error) {
      return { location: error, forecastData: "" };
    }
  }

  /*
  if (!address) {
    return { location: "Please provide an address", forecastData: "" };
  } else {
    geocode(address, (error, { latitude, longitude, location }) => {
      if (error) {
        return error;
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return error;
        }
        return { location: location, forecastData: forecastData };
      });
    });
  }
  */
};

module.exports = getWeatherInfo;
