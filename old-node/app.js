//TODO create requirements function seperate from server
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var PythonShell = require('python-shell');
var pyshell = new PythonShell('node.py');

var app = express();
var port = 8000;

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}

app.set('env', 'dev');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

if (app.get('env') === 'dev') {
  app.set('title', 'Malgamate');
  app.locals.pretty = true;
}
//app = require('./settings')(app);


app.use(stylus.middleware(
	{ src: __dirname + '/public'
	, compile: compile
	}));

app.use(express.static(__dirname + '/public'));

/*Cool way to do urls through pluggable and standalone modules
//app.use('/module-a', require('./module-a'))
//app.use('/module-b', require('./module-b'))

//module.exports = function(){
//  var express = require('express');
//  var app = express();

//  app.get('/:id', function(req, res){...});

  return app;
}();
*/

//simple logger
app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});



var router = express.Router();

// use set's middleware that will happen every request
router.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

router.get('/', function(req, res) {
	res.render('index',
		{ title: 'Home' }
	);
});

router.get('/about', function(req, res) {
	res.send('im the about page!');
});

router.get('/search', function(req, res) {
	// sends a message to the Python script via stdin
	// receive a message in text mode
	var shell = new PythonShell('node.py', { mode: 'text'});


	var output = '';
    shell.stdout.on('data', function (data) {
        output += ''+data;
    });
    shell.send('hello').send('world');
	//shell.on('message', function (message) {
		//d = JSON.parse(message)
		//res.send(d)// handle message (a line of text from stdout)
	//});
	shell.end();
	//res.send('hi')
});


app.use('/', router);

app.listen(port);
