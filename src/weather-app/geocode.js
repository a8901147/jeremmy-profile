const request = require("request");

const geocode = (address) => {
  // const url =
  //   "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
  //   address +
  //   ".json?access_token=pk.eyJ1IjoiYTg5MDExNDciLCJhIjoiY2tzMWF2cnVyMWFyNTMxbXIzMTczaXh6ZyJ9.qj4a3EwgT2GL8Y7kuaO_iw&limit=1";

  // request({ url, json: true }, (error, { body }) => {
  //   if (error) {
  //     callback("Unable to connect to location services!", undefined);
  //   } else if (body.features.length === 0) {
  //     callback("Unable to find location. Try another search.", undefined);
  //   } else {
  //     callback(undefined, {
  //       latitude: body.features[0].center[1],
  //       longitude: body.features[0].center[0],
  //       location: body.features[0].place_name,
  //     });
  //   }
  // });

  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYTg5MDExNDciLCJhIjoiY2tzMWF2cnVyMWFyNTMxbXIzMTczaXh6ZyJ9.qj4a3EwgT2GL8Y7kuaO_iw&limit=1";

  return new Promise((resolve, reject) => {
    request({ url, json: true }, (error, { body }) => {
      if (error) {
        reject("Unable to connect to location services!");
      } else if (body.features.length === 0) {
        reject("Unable to find location. Try another search.");
      } else {
        resolve({
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        });
      }
    });
  });
};

module.exports = geocode;
