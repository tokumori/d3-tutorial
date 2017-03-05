import './styles/styles.css';
import * as d3 from './d3modules.js';
import debug from 'debug';
const log = debug('app:log');

if (ENV !== 'production') {
  // Enable logger.
  debug.enable('*');
  log('Logging is enabled!');

  // Enable LiveReload
  document.write(
    '<script src="http://' + (location.host || 'localhost').split(':')[0] +
    ':35729/livereload.js?snipver=1"></' + 'script>'
  );
} else {
  debug.disable();
}

var data = [4, 8, 15, 16, 23, 42];

var x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

d3.select('.chart')
  .selectAll('div')
    .data(data)
  .enter().append('div')
    .style('width', function(d) { return x(d) + 'px'; })
    .text(function(d) { return d; });