'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: '<%= jshint.all %>',
                tasks: ['combine','copy:examples']
            },
            docs: {
                files: '<%= jshint.all %>',
                tasks: ['jsdoc']
            }
        },
        concat: {
            options: {
            },
            dist: {
                src: [
                    'src/*.js',
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'src/*.js'
            ]
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                sourceMap: '<%= pkg.name %>.js.map',
                sourceMappingURL: '<%= pkg.name %>.js.map',
                sourceMapPrefix: 2
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            examples: {
                files: [
                ]
            },
            bysource: {
                files: [
                ]
            }
        },
        devserver: {
            options: {
            },
            server: {}
        },
        jsdoc : {
            dist: {
                src: [
                    'src/**/*.js'
                ],
                options: {
                    destination: 'docs',
                    configure: 'node_modules/angular-jsdoc/conf.json',
                    template: 'node_modules/angular-jsdoc/template'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-devserver');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('combine',['concat:dist','uglify:dist',]);

    grunt.registerTask('default', [
        'combine'
    ]);
};