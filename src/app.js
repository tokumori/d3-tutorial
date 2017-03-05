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

const width = 960;
const height = 500;
const innerRadius = 50;
const outerRadius = innerRadius + 5;
const innerArcIntercept = (width / 2) - innerRadius;
const arcData = [150, 250];
const lineData = [
  {
    x1: 100,
    y1: arcData[0],
    x2: innerArcIntercept,
    y2: arcData[0],
  },
  {
    x1: 100,
    y1: arcData[1],
    x2: innerArcIntercept,
    y2: arcData[1],
  },
];
const textData = [
  {
    x: 200,
    y: 130,
    text: 'banana',
  },
  {
    x: 200,
    y: 230,
    text: 'banana',
  },
];
const arc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius)
  .startAngle(-Math.PI/2)
  .endAngle(Math.PI/2);

const svg = d3.select('body')
  .append('svg')
    .attr('width', width)
    .attr('height', height);

const arcs = svg.selectAll('g')
    .data(arcData)
  .enter().append('g')
    .attr('transform', (d) => {
      return `translate(${width/2}, ${d})`;
    });

arcs.append('path')
    .attr('class', 'arc')
    .attr('d', arc);

svg.selectAll('line')
    .data(lineData)
  .enter().append('line')
    .attr('class', 'line')
    .attr('x1', (d) => {
      return d.x1;
    })
    .attr('y1', (d) => {return d.y1;})
    .attr('x2', (d) => {return d.x2;})
    .attr('y2', (d) => {return d.y2;});

svg.selectAll('text')
    .data(textData)
  .enter().append('text')
    .attr('class', 'text')
    .attr('x', (d) => {
      return d.x;
    })
    .attr('y', (d) => {
      return d.y;
    })
    .text((d) => {
      return d.text;
    });

svg.append('rect')
    .attr('class', 'rect')
    .attr('width', innerRadius * 5)
    .attr('height', height / 2)
    .attr('x', (width / 2) - (outerRadius * 2))
    .attr('y', 50);