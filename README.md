# spms-vue

[![Netlify Status](https://api.netlify.com/api/v1/badges/7002ce13-205f-4995-9f4f-b0d10a5351a5/deploy-status)](https://app.netlify.com/sites/spms-vue/deploys)    [![Build Status](https://travis-ci.com/anoobbava/spms-vue.svg?branch=master)](https://travis-ci.com/anoobbava/spms-vue)  [![Coverage Status](https://coveralls.io/repos/github/anoobbava/spms-vue/badge.svg)](https://coveralls.io/github/anoobbava/spms-vue)

This is the Vue front end application which is used to log the secondary time sheet for the employees. Currently backed with ROR and below functionalities are covered here

### functionalities
1. able to login and logout
2. added the sweet-alert2 for the better alert system.
3. added the Vuetify for the material themes.
4. Added Vue-router for the routing.
5. Added Vuex for the state management.
6. Added provision to create tickets against projects.
7. Added provision to log time against the tickets.
8. Display a monthly calendar for the current occupancy.
9. Able to display the profile and update the profile.
6. Added JEST for the unit testing.
7. Added Travis CI for the Builds.
8. Added coveralls for the Coverage.

### Added Jest for the local coverage

`<Project-local-path>/coverage/index.html`
example: `file:///Users/sarath/vuejs/spms-vue/coverage/index.html`

### To run only a single test

`"test:unit": "vue-cli-service test:unit --watch` to execute a interactive testing.

### Setup Locally

`npm install` to install the dependencies

`npm run serve` to run the DEV environment

`npm run test:unit` for the unit tests

`VUE_APP_RAILS_API_URL=` is the URL for the ROR Backend.

