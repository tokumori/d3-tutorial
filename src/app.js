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

const circle = d3.selectAll('circle');

circle.data([32, 57, 112]);

circle.style('fill', 'steelblue')
  .attr('r', (d) => {
    return Math.sqrt(d);
  })
  .attr('cx', (d, i) => {
    return i * 100 + 30;
  });
