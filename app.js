/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var settings = require('./settings');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({
	keepExtensions: true,
	uploadDir: './uploads'
}));
app.use(express.methodOverride());
app.use(express.cookieParser());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

routes(app);

var server = http.Server(app);

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});