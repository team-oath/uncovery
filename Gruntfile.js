module.exports = function(grunt) {

  grunt.initConfig({
    express: {
      dev: {
        options: {
          script: 'index.js'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['specs/**/*.js']
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'server/**/*.js', 'index.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'express-restart']
    }
  });

  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('default', [
    'jshint',
    'test',
    'express',
    'watch'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);
};
