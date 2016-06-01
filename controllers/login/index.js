'use strict';

var passport = require('passport');

module.exports = function(router) {
  console.log('login ctrl');
  router.post('/', function(req, res) {
    console.log('login hit');
  });
}
