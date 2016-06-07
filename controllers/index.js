'use strict';

var IndexModel = require('../models/index');


module.exports = function (router) {
  router.all('*', isLoggedIn);
  router.get('/', function (req, res) {
    // The only reason this file is being served separately
    // is so that the server will send the token.
    res.sendFile('/index.html', {'root': './main_view'});
  });



};

function isLoggedIn(req,res,next) {
	if (req.isAuthenticated()) {
    console.log('user IS authenticated');
		return next();
	}
	console.log('user is NOT authenticated');
  return next();
}
