'use strict'

const path = require('path')
const _ = require('lodash')
const gulp = require('gulp')
const rollup = require('rollup').rollup
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')
const replace = require('rollup-plugin-replace')

// faster builds
require('rollup-watch')

const args = process.argv
  .slice(2)
  .filter(arg => arg.indexOf('--') !== -1)
  .reduce((result, arg) => {
    const [ name, value ] = arg.match(/--(.+)=(.+)/).slice(1)
    result[_.camelCase(name)] = value
    return result
  }, {})

const SRC = './src/js/index.js'
const DEST = './assets/js/'

let cache

function buildApplication () {
  return rollup({
    entry: SRC,
    cache: cache,
    plugins: [
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: ['react', 'es2015-rollup'],
      }),
      nodeResolve({ jsnext: true }),
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/react/react.js': ['PropTypes', 'createElement', 'Component']
        },
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      uglify(),
    ],
  }).then((bundle) => {
    cache = bundle

    return bundle.write({
      format: 'iife',
      dest: DEST + 'main.js'
    })
  }).then(() => {
    if (args.copyPath) {
      return copyAssets()
    }
  })
}

const copyAssets = () => {
  if (!args.copyPath) return;
  console.log(path.resolve('assets/**/*'))
  gulp.src([ path.resolve('assets/**/*') ])
    .pipe(gulp.dest(`${args.copyPath}/assets`))
  console.log(`Copied to ${args.copyPath}`)
}

const watchFiles = () => {
  return gulp.watch('./src/js/**.{js,jsx}', ['default'])
}

gulp.task('default', buildApplication)
gulp.task('watch', watchFiles)
gulp.task('copy-to-blog', copyAssets)
