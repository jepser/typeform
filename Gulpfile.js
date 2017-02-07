'use strict'

const path = require('path')
const _ = require('lodash')
const gulp = require('gulp')

const sass = require('gulp-sass')
const cssnano = require('gulp-cssnano')
const autoprefixer = require('gulp-autoprefixer')

const rollup = require('rollup').rollup
const watch = require('rollup-watch')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const uglify = require('rollup-plugin-uglify')

const replace = require('rollup-plugin-replace')

const args = process.argv
  .slice(2)
  .filter(arg => arg.indexOf('--') !== -1)
  .reduce((result, arg) => {
    const [ name, value ] = arg.match(/--(.+)=(.+)/).slice(1)
    result[_.camelCase(name)] = value
    return result
  }, {})

const SRC = './src/'
const DEST = './assets'

let cache

function buildApplication () {
  return rollup({
    entry: `${SRC}/js/index.js`,
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
          'node_modules/react/react.js': ['PropTypes', 'createElement', 'Component'],
        },
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      uglify(),
    ],
  }).then((bundle) => {
    cache = bundle

    return bundle.write({
      format: 'iife',
      dest: `${DEST}/js/typeform-tinymce.js`,
    })
  }).then(() => {
    if (args.copyPath) {
      return copyAssets()
    }
  })
}

function buildStyles () {
  return gulp.src(`${SRC}/sass/main.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 10%'],
      cascade: false,
    }))
    .pipe(cssnano())
    .pipe(gulp.dest(`${DEST}/css/`))
}

const copyAssets = () => {
  if (!args.copyPath) return
  gulp.src([ path.resolve('assets/**/*') ])
    .pipe(gulp.dest(`${args.copyPath}/assets`))
}

const watchFiles = () => {
  gulp.watch('./src/js/**.{js,jsx}', ['scripts'])
  gulp.watch('./src/sass/**.scss', ['styles', 'copy-to-blog'])
}

gulp.task('default', ['scripts', 'styles', 'copy-to-blog'])
gulp.task('scripts', buildApplication)
gulp.task('styles', buildStyles)
gulp.task('watch', watchFiles)
gulp.task('copy-to-blog', copyAssets)
