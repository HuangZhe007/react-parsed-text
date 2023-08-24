import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
const babelOptions = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  exclude: '**/node_modules/**',
};
export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      typescript({
        exclude: 'node_modules/**',
        include: 'src/**',
      }),
      resolve(),
      commonjs(),
      external(),
      babel(babelOptions),
      terser(),
    ],
    external: ['react'],
  },
];
