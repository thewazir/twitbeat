/**
 * The idiomatic ReactJS application compiles JSX as a build step, and doesn't use the in-browser JSX transformer.
 * This repo uses a very basic gulp + webpack + babel build to write React with ES6, and build it for the browser
 * @type {Gulp|exports}
 */
const gulp         = require('gulp')
    , gwebpack     = require('gulp-webpack')
    , nodemon      = require('gulp-nodemon')
    , path         = require('path')
    , concat       = require('gulp-concat')
    , autoprefixer = require('gulp-autoprefixer')
    , del          = require('del')
    , less         = require('gulp-less')
    , webpack      = require('webpack')
    , $            = require('gulp-load-plugins')({pattern: ['gulp-*']});

/**
 * A simple task to clean any build products
 */
gulp.task('clean', function( cb ) {
    return del(['dist'], cb);
});

/**
 * Compile our LESS into a single CSS file
 */
gulp.task('less', ['clean'], function() {


    //app styles
    return gulp.src('./app/assets/stylesheets/app.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concat('app.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('./dist/assets/stylesheets'));

});

/**
 * A simple task to copy our HTML file and images to the dist directory
 */
gulp.task('copy', ['clean'], function() {
    var html     = gulp.src("./app/index.html").pipe(gulp.dest("dist/"))
        , sounds = gulp.src("./app/assets/sounds/**/*").pipe(gulp.dest("dist/sounds"))
        , images = gulp.src("./app/images/**/*.*").pipe(gulp.dest("dist/images"));
});

/**
 * The main step is 'pack' this step takes our 'client.js' file, and builds it using Webpack, the babel-loader plugin to
 * transpile ES6 and outputs it to the dist directory
 */
gulp.task('pack', ['clean'], function() {
    return gulp.src('./app/client.js')
        .pipe(gwebpack({
            resolve: {
                extensions: ['', '.js', '.jsx']
            },
            output: {
                path: __dirname + '/dist',
                filename: 'client.js'
            },
            module: {
                loaders: [
                    {test: /\.jsx$/, exclude: [/(node_modules)/], loader: 'babel-loader?stage=0'},
                    {test: /\.js$/, exclude: [/(node_modules)/], loader: 'babel-loader?stage=0'}
                ]
            },
            plugins: [
                new webpack.IgnorePlugin(new RegExp("models"))
            ]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('develop', ['build'], function() {
    nodemon({
        "execMap": {
            "js": "node --harmony",
            "jsx": "node --harmony"
        },
        script: 'server.js'
        , ext: 'jsx js less'
        , tasks: ['build']
    })
        .on('restart', function() {
            console.log('restarted!')
        })
});

/**
 * The default task is build
 */
gulp.task("default", ["build"]);

/**
 * Define our build task
 */
gulp.task("build", ["clean", "less", "copy", "pack"]);