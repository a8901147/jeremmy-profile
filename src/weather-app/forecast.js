const request = require("request");

const forecast = (latitude, longitude) => {
  /*
  const url =
    "http://api.weatherstack.com/current?access_key=4dc2b224ef24f124ddea1054f31c57ef&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          ". It is currently " +
          response.body.current.temperature +
          " degress out."
      );
    }
  });
  */

  const url =
    "http://api.weatherstack.com/current?access_key=4dc2b224ef24f124ddea1054f31c57ef&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  return new Promise(function (resolve, reject) {
    request({ url: url, json: true }, (error, response, body) => {
      // in addition to parsing the value, deal with possible errors
      if (error) reject("Unable to connect to weather service!");
      else if (response.body.error) {
        reject("Unable to find location in weather service");
      } else {
        resolve(
          response.body.current.weather_descriptions[0] +
            ". It is currently " +
            response.body.current.temperature +
            " degress out."
        );
      }
    });
  });
};

module.exports = forecast;
