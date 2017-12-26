# Node BACstack Browser

A BACnet browser using [Electron](https://electronjs.org/), [Angular](https://angular.io/)
and [Node BACstack](https://github.com/fh1ch/node-bacstack).

[![](https://travis-ci.org/fh1ch/node-bacstack-browser.svg?branch=master)](https://travis-ci.org/fh1ch/node-bacstack-browser)
[![](https://coveralls.io/repos/fh1ch/node-bacstack-browser/badge.svg?branch=master)](https://coveralls.io/r/fh1ch/node-bacstack-browser?branch=master)
[![](https://codeclimate.com/github/fh1ch/node-bacstack-browser/badges/gpa.svg)](https://codeclimate.com/github/fh1ch/node-bacstack-browser)
[![](https://david-dm.org/fh1ch/node-bacstack-browser/status.svg)](https://david-dm.org/fh1ch/node-bacstack-browser)

> **Note:** This is an early prototype and shall not be considered as stable.
> Use it with caution and at your own risk!

![](images/overview.gif)

## Usage

Start Node BACstack Browser by using:

``` sh
git clone https://github.com/fh1ch/node-bacstack-browser.git

cd node-bacstack-browser
npm i

npm start
```

> **Note:** If the application window appears as a blank page, force refresh the
> page using F5 (Windows) or CMD+R (OSX).

## Contributing

Any help is appreciated, from creating issues, to contributing documentation,
fixing issues and adding new features.

Please follow the best-practice contribution guidelines as mentioned below when
submitting any changes.

### Conventional Changelog

This module has a changelog which is automatically generated based on Git commit
messages. This mechanism requires that all commit messages comply with the
[Conventional Changelog](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md).
You can check if your commit messages complies with those guidelines by using:

``` sh
npm run changelog
```

### Code Style

This module uses [TSLint](https://palantir.github.io/tslint/) with the
[Angular-CLI](https://github.com/angular/angular-cli) default settings for code
linting. You can test if your changes comply with the code style by executing:

``` sh
npm run lint
```

### Testing and Coverage

Testing is done using [Karama](https://karma-runner.github.io/)
and [Protractor](http://www.protractortest.org/), both provided by the
[Angular-CLI](https://github.com/angular/angular-cli).

The test-coverage is automatically calculated using [Istanbul](https://istanbul.js.org/).
Running the tests and calculating the coverage can be done locally by executing:

``` sh
npm run test && npm run e2e
```

It is expected that new features or fixes do not negatively impact the test
results or the coverage.

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2017 Fabio Huser <fabio@fh1.ch>
