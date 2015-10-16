/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015, Hugo Freire <hfreire@exec.sh>.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
                    'src/*.js'
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

    grunt.registerTask('combine',['concat:dist','uglify:dist']);

    grunt.registerTask('default', [
        'combine'
    ]);
};