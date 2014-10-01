module.exports = function (grunt) {

	'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON('./package.json'),
		
		/**
		 * Project object
		 */
		project: {
			src: 'src',
			dev: 'dev',
			port: 9001
		},
		
		/**
		 * Start server with livereload
		 */
		connect: {
			livereload: {
				options: {
					port: '<%= project.port %>',
					hostname: 'localhost', //'0.0.0.0', // Setting it to '*' will make the server accessible from anywhere.
					base: '<%= project.dev %>',
					debug: false, // Debugging in terminal
					open: true // Open page in default browser
				}
			}
		},
		
		/**
		 * Watch for changes in files
		 */
		watch: {
			options: {
				livereload: 35729
			},
			html: {
				files: ['<%= project.dev %>/**/*.html'],
				tasks: []
			},
			css: {
				files: ['<%= project.src %>/sass/**/*.scss'],
				tasks: ['sass']
			},
			scripts: {
				files: ['<%= project.src %>/js/**/*.js'],
				tasks: ['jshint', 'concat', 'uglify']
			}
		},
		
		/**
		 * Sass
		 */		
		sass: {
			dev: {
				options: {
					style: 'expanded' // nested, compact, compressed, expanded 
				},
				files: [{
					expand: true,
					cwd: '<%= project.src %>/sass',
					src: ['*.scss'],
					dest: '<%= project.dev %>/assets/css',
					ext: '.css'
				}] 
			}
		},

		/*
		 * Validate files with JSHint.
		 */
		jshint: {
			// Configure JSHint (documented at http://www.jshint.com/docs/).
			options: {
				'-W032': false, // Removed 'no-extra-semi' varning
			},
			files: ['Gruntfile.js', '<%= project.src %>/js/*.js', '!<%= project.src %>/js/lib/**/*.js']
		},

		/**
		 * Concat JS files to one
		 */
		concat: {
			options: {},
			dev: {
				src: [
					'<%= project.src %>/js/main.js',
					'<%= project.src %>/js/init.js',
					'<%= project.src %>/js/scripts/*.js'
				],
				dest: '<%= project.dev %>/assets/js/scripts.js'
			}
		},
		
		/**
		 * Uglify and compress JS
		 */
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
				beautify: true,
				compress: true,			// true false
				mangle: false,			// true false,
				preserveComments: false // 'all' 'some'
			},
			build: {
				src: '<%= project.dev %>/assets/js/scripts.js',
				dest: '<%= project.dev %>/assets/js/scripts.min.js'
			}
		}
	});

	/* Load plugins in package.json */
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	
	/* Grunt tasks */
	grunt.registerTask('default', [
		'jshint',
		'concat',
		'uglify',
		'sass',
		'connect',
		'watch'
	]);

};