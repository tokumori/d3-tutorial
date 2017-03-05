import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/d3modules.js',
  dest: 'public/js/d3.js',
  format: 'umd',
  moduleName: 'd3',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
    }),
    uglify({
      compress: {},
      mangle: true,
    }),
  ]
};