'use strict';
import { apiKey} from './apiKey.js';

// API call to OpenWeatherMap.org, takes in zip code input from main controller
export const getWeather = (zip) => {
  return new Promise((resolve, reject) => {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?zip=${ zip },us&APPID=${ apiKey }&units=imperial`
      })
    .then(data => resolve(data))
    .catch(error => reject(error.responseJSON.message));
  });
};

// in case api fails,
// read from local json
// export const getWeather = () => {
//   return new Promise((resolve, reject) => {
//     $.ajax({
//       url: '../data/sample.json'
//     })
//     .then(data => resolve(data))
//     .catch(error => reject(error.responseJSON.message));
//   });
// };
