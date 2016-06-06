'use strict';

var IndexModel = require('../models/index');


module.exports = function (router) {

  router.get('/', function (req, res) {
    // The only reason this file is being served separately 
    // is so that the server will send the token.
    res.sendFile('/index.html', {'root': './main_view'});
  });

};
