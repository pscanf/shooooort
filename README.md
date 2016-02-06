[![Build Status](https://travis-ci.org/pscanf/shooooort.svg?branch=master)](https://travis-ci.org/pscanf/shooooort)
[![codecov](https://codecov.io/github/pscanf/shooooort/coverage.svg?branch=master)](https://codecov.io/github/pscanf/shooooort?branch=master)
[![coveralls](https://coveralls.io/repos/github/pscanf/shooooort/badge.svg?branch=master)](https://coveralls.io/github/pscanf/shooooort?branch=master)
[![dependencies](https://david-dm.org/pscanf/shooooort.svg)](https://david-dm.org/pscanf/shooooort)
[![devDependencies](https://david-dm.org/pscanf/shooooort/dev-status.svg)](https://david-dm.org/pscanf/shooooort#info=devDependencies)

# shooooort

## Development environment setup

After cloning the repository, run `npm install` to install all dependencies and
`npm run dev` to start the development server.

## Configuration

The application can be configured using a `.env` file. Variables declared in the
file will become available in the `window.APP_CONFIG` object (provided
`/app-config.js` is included in the `app/main.html` source file).

Configuration options:
- `API_URL`
