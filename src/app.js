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

// SVG Canvas
const width = 960;
const height = 500;

// Arc data
const innerRadius = 50;
const outerRadius = innerRadius + 5;
const innerArcIntercept = (width / 2) - innerRadius;
const arcYCoord1 = 150;
const arcYCoord2 = 250;
const arcYCoordData = [arcYCoord1, arcYCoord2];

// Line data
const lineData = [
  {
    x1: innerArcIntercept - 300,
    y1: arcYCoord1,
    x2: innerArcIntercept,
    y2: arcYCoord1,
  },
  {
    x1: innerArcIntercept - 300,
    y1: arcYCoord2,
    x2: innerArcIntercept,
    y2: arcYCoord2,
  },
];

// Text data
const textData = [
  {
    x: lineData[0].x1 + 100,
    y: arcYCoord1 - 20,
    text: 'banana',
  },
  {
    x: lineData[0].x1 + 100,
    y: arcYCoord2 - 20,
    text: 'banana',
  },
];

// SVG creation
const svg = d3.select('body')
  .append('svg')
    .attr('width', width)
    .attr('height', height);

// Arc creation
const arc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(outerRadius)
  .startAngle(-Math.PI/2)
  .endAngle(Math.PI/2);

const arcs = svg.selectAll('g')
    .data(arcYCoordData)
  .enter().append('g')
    .attr('transform', (d) => {
      return `translate(${width/2}, ${d})`;
    });

arcs.append('path')
    .attr('class', 'arc')
    .attr('d', arc);

// Line creation
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

// Text creation
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

// Rectangle creation
svg.append('rect')
    .attr('class', 'rect')
    .attr('width', innerRadius * 5)
    .attr('height', height * (2/3))
    .attr('x', (width / 2) - (outerRadius * 2))
    .attr('y', arcYCoord1 - 100);