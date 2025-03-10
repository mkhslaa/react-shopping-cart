const { defineConfig } = require('cypress')

module.exports = defineConfig({
  experimentalModifyObstructiveThirdPartyCode: true,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    fixturesFolder: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // and load any plugins that require the Node environment
    },
    requestTimeout: 2000,
    defaultCommandTimeout: 5000,
    retries: 1,
    video:false
  },
})
