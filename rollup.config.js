import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import partial from 'postcss-partial-import';

export default {
  entry: 'src/app.js',
  dest: 'public/js/app.js',
  format: 'umd',
  sourceMap: 'inline',
  acorn: {
    allowReserved: true,
  },
  plugins: [
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnext({warnForDuplicates: false}),
        partial({prefix: '_'}),
        cssnano(),
      ],
      extensions: ['.css'],
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};