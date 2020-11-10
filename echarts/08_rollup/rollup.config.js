import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';

export default {
	input: './src/index.js',
	plugins: [resolve(), babel(), uglify()],
	output: {
		format: 'umd',
		sourcemap: true,
		file: 'dist/bundle.js',
	},
};