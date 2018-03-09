// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const baseConfig = require('./karma.conf');
module.exports = function (config) {
  // apply base config.
  baseConfig(config);
  // travis-ci specific overrides.
  config.set({
    coverageIstanbulReporter: {
      reports: ['lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'coverage-istanbul'],
    port: 9876,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true
  });
};
