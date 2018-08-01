var gulp = require('gulp'),
    babel = require('gulp-babel'),
    rollup = require('gulp-rollup');


gulp.task('bundle', function() {
    gulp.src('./scripts/**/*.js')
        .pipe(rollup({
            "format": "iife",
            "plugins": [
                require("rollup-plugin-babel")({
                    "presets": [["es2015", { "modules": false }]],
                    "plugins": ["external-helpers"]
                })
            ],
            entry: 'scripts/app.js'
        }))
        .pipe(gulp.dest('./dist'));
});