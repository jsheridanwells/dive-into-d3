'use strict';

import { getWeather } from './ajax.js';
import { drawChart } from './line-chart.js';

//When submit button is clicked,
// Passes in value from zip code field, makes API call,
// Sorts api data, passes data to drawChart function
$('#submit').click(() => {
  $('#chart').empty();
  let zip = $('#zip-input').val();
  getWeather(zip)
    .then(data => {
      $('.city').css('visibility', 'initial');
      $('#city').text(data.city.name);
      let processedData = sortTimeTemps(data);
      drawChart(processedData);
    })
    .catch(error => {
      $('#chart').html(`<p>${error}</p>`);
    });
});

// Helper to take raw JSON from openweather.org
// and return an array of temperatures for given type: temp, temp_min, or temp_max
function sortTimeTemps(data) {
    let timeTemps = [];
    data.list.forEach((list) => {
        timeTemps.push({
            time: list.dt * 1000,
            temp_max: list.main.temp_max
        });
    });
    return timeTemps;
}
