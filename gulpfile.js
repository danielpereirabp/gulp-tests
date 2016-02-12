var elixir = require('laravel-elixir'),
	clean = require('rimraf'),
	gulp = require('gulp');

var config = {
	bower_path: './bower_components',
	assets_path: './assets',
	build_path: './public/build'
};

config.build_path_js = config.build_path + '/js';
config.build_vendor_path_js = config.build_path_js + '/vendor';
config.vendor_path_js = [
	config.bower_path + '/jquery/dist/jquery.min.js',
	config.bower_path + '/bootstrap/dist/js/bootstrap.min.js',
	config.bower_path + '/angular/angular.min.js'
];

config.build_path_css = config.build_path + '/css';
config.build_vendor_path_css = config.build_path_css + '/vendor';
config.vendor_path_css = [
	config.bower_path + '/bootstrap/dist/css/bootstrap.min.css',
	config.bower_path + '/bootstrap/dist/css/bootstrap-theme.min.css'
];

gulp.task('copy-styles', function () {
	gulp.src(config.assets_path + '/css/**/*.css')
		.pipe(gulp.dest(config.build_path_css));

	gulp.src(config.vendor_path_css)
		.pipe(gulp.dest(config.build_vendor_path_css));
});

gulp.task('copy-scripts', function () {
	gulp.src(config.assets_path + '/js/**/*.js')
		.pipe(gulp.dest(config.build_path_js));

	gulp.src(config.vendor_path_js)
		.pipe(gulp.dest(config.build_vendor_path_js));
});

gulp.task('clear-build-folder', function () {
	clean.sync(config.build_path);
});

gulp.task('default', ['clear-build-folder'], function () {
	elixir(function (mix) {
		mix.styles(
			config.vendor_path_css.concat([config.assets_path + '/css/**/*.css']),
			'public/build/css/all.css'
		);

		mix.scripts(
			config.vendor_path_js.concat([config.assets_path + '/js/**/*.js']),
			'public/build/js/all.js'
		);
	});
});

gulp.task('watch-dev', ['clear-build-folder'], function () {
	gulp.start('copy-styles', 'copy-scripts');
});