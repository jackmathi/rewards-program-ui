/** @type {import('jest').Config} */
const config = {
    verbose: true,
    transform: {
        '^.+\\.js$': 'babel-jest',
      },
  };
  
  module.exports = config;