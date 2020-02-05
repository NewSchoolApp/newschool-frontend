module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  'collectCoverageFrom': [
    '<rootDir>/**/*.vue',
    '<rootDir>/**/*.js',
    '!<rootDir>/node_modules/**',
    '!<rootDir>/coverage/**',
    '!<rootDir>/jest.config.js',
    '!<rootDir>/nuxt.config.js',
    '!<rootDir>/static/sw.js'
  ],
  'coverageThreshold': {
    'global': {
      'branches': 0,
      'functions': 0,
      'lines': 0,
      'statements': 0
    }
  }
}
