module.exports = {
    testEnvironment: 'node',
    globalTeardown: './teardown.js',
    verbose: true,
    testMatch: [
      '**/__tests__/**/*.js',
      '**/?(*.)+(spec|test).js'
    ]
};
  