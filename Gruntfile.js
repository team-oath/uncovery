
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
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'express-restart']
      },
      css: {
        files: ['server/landing/sass/**'],
        tasks: ['sass']
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'compressed',
          compass: true
        },
        files: {                         // Dictionary of files
          'server/landing/assets/css/main.min.css': 'server/landing/sass/main.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', [
    'jshint',
    'test',
    'express',
    'watch:jshint'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('css', ['watch:css']);

};
