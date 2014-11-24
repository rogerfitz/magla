var express = require('express');

module.exports = function(app){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	if (app.get('env') === 'dev') {
	  app.set('title', 'Malgamate');
	  app.locals.pretty = true;
	}
	return app;
}();