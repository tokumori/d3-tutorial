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

const margin = {top: 120, right: 120, bottom: 120, left: 120};
const width = 960;
const height = 500;

const svg = d3.select('body')
  .append('svg')
    .attr('width', width)
    .attr('height', height)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const arc = d3.arc()
  .innerRadius(100)
  .outerRadius(105)
  .startAngle(-Math.PI/2)
  .endAngle(Math.PI/2);

svg.append('path')
    .attr('class', 'arc')
    .attr('d', arc);