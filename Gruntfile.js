module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js']
    },
    copy: {
      editor: {
        files: [
          {expand: true, src: [
            'WaveDrom.js',
            'editor.html', 'tutorial.html',
            'images/ic_*.png', 'images/favicon.ico', 'images/logo.png',
            'skins/*', 'css/*', 'scripts/*'
          ], dest: 'WaveDromEditor_build/', filter: 'isFile'},
          {expand: true, flatten: true, src:['WaveDromEditor/package.json'], dest: 'WaveDromEditor_build/', filter: 'isFile'},
        ]
      }
    },
    nodewebkit: {
      options: {
        buildDir: './nw_builds',
        platforms: ['win', 'osx', 'linux32', 'linux64'],
        keep_nw: true
      },
      src: ['./WaveDromEditor_build/**']
    },
    compress: {
      win: {
        options: {archive: 'nw_builds/<%= pkg.name %>-v<%= pkg.version %>-win-ia32.zip'},
        files: [{expand: true, cwd: 'nw_builds/WaveDromEditor/win/', src: ['**'], dest: '.'}]
      },
      linux32: {
        options: {archive: 'nw_builds/<%= pkg.name %>-v<%= pkg.version %>-linux-ia32.tar.gz'},
        files: [{expand: true, cwd: 'nw_builds/WaveDromEditor/linux32/', src: ['**'], dest: '.'}]
      },
      linux64: {
        options: {archive: 'nw_builds/<%= pkg.name %>-v<%= pkg.version %>-linux-x64.tar.gz'},
        files: [{expand: true, cwd: 'nw_builds/WaveDromEditor/linux64/', src: ['**'], dest: '.'}]
      },
      mac: {
        options: {archive: 'nw_builds/<%= pkg.name %>-v<%= pkg.version %>-osx-ia32.zip'},
        files: [{expand: true, cwd: 'nw_builds/WaveDromEditor/osx/', src: ['**'], dest: '.'}]
      },
      nw: {
        options: {archive: 'nw_builds/<%= pkg.name %>-v<%= pkg.version %>.nw', mode:'zip'},
        files: [{expand: true, cwd: 'WaveDromEditor_build/', src: ['**'], dest: '.'}]
      }
    },
    clean: {
        nw_builds:['nw_builds'],
        build: ['build'],
        node: ['node_modules'],
        WaveDromEditor_build: ['WaveDromEditor_build'],
        cache: ['cache']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('build', ['jshint', 'copy:editor', 'nodewebkit']);
  grunt.registerTask('default', ['build', 'compress']);
};
