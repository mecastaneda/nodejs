'use strict';

var passport = require('passport');

module.exports = function(router) {

  router.post('/', function(req, res, next) {

    passport.authenticate('local', function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        res.status(403);
        return res.json({"error": info});
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        console.log('user logged in, sending cookie', user._id);
        res.cookie('userId', user._id).send('success');
      });
    })(req, res, next);
  });
}
