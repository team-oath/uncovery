
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
    },
    uglify: {
    options: {
      mangle: false
    },
    my_target: {
      files: {
        'server/landing/assets/js/app.min.js':
        ['server/landing/assets/js/jquery.easing.min.js',
        'server/landing/assets/js/plugins/bxslider/jquery.bxslider.js',
        'server/landing/assets/js/plugins/slick/slick.js',
        'server/landing/assets/js/plugins/localscroll/jquery.scrollTo-1.4.3.1-min.js',
        'server/landing/assets/js/plugins/localscroll/jquery.localscroll-1.2.7-min.js',
        'server/landing/assets/js/zi-script.js']
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
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'jshint',
    'test',
    'express',
    'watch:jshint'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('js', [
    'uglify'
  ]);

  grunt.registerTask('css', ['watch:css']);

};
