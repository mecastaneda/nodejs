'use strict';


var kraken = require('kraken-js'),
    app = require('express')(),
    options = require('./lib/spec')(app),
    port = process.env.PORT || 8000;

process.env.RECAPTCHA_PRIVATE_KEY = '6LdzvyETAAAAAJra4yuZVCe-yVEbmrQAfzDrxRnU';

app.use(kraken(options));

app.listen(port, function(err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});
