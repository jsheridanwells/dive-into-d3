'use strict';

// borrowed heavily from this chart:
// https://bl.ocks.org/pstuffa/26363646c478b2028d36e7274cedefa6

export function drawChart(chartData) {

  console.log(chartData);

  // 1. Set the height, width, and margin of the chart based on the window and height of the navbar.
  let margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = $('#chart').width() - margin.left - margin.right,
      height = window.innerHeight - margin.top - margin.bottom - $('#nav').height() - 20;

  // 2. Create an SVG using the dimensions set above.
  let svg = d3.select('#chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // 3. Set the scale for the y-axis, mapped from 0 to highest temperature + 10
  const yScale = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.temp_max) + 10])
      .range([height, 0]);

  // 4. Set the scale for the x-axis, mapped to range of times in dataset
  const xScale = d3.scaleTime()
      .domain(d3.extent(chartData, d => d.time))
      .range([0, width]);

  // 5. Append dots for each temperature
  svg.selectAll('.dot')
      .data(chartData)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => xScale(d.time))
      .attr('cy', (d) => yScale(d.temp_max))
      .attr('r', 2);

  // 6. Create a function that returns a line following the X and Y scales that were set
  const line = d3.line()
      .x(d => xScale(d.time))
      .y(d => yScale(d.temp_max));

  // 7. Add a path element to the SVG that follows the output of our line function
  svg.append('path')
      .datum(chartData)
      .attr('d', line)
      .attr('class', 'line');

  // 8. append x-axis
  svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale)
          .ticks(d3.timeHour.every(6)));

  // 9. append y-axis, add 'TEMPERATURE' label
  svg.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('fill', '#000000')
      .text('Temperature (F)')
      .attr('transform', 'rotate(-90)')
      .attr('y', 5)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end');
}
