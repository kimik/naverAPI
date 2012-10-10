
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , request = require('request');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req,res){
  res.render('index');
});

app.post('/findimg', function(req, res){
  //console.log("Ajax" + req.body.query);
  var url ="http://openapi.naver.com/search?key=7b6053cbd062dc368303f9643fcd14b8"
    + "&target=image"
    + "&query=" + req.body.query
    + "&filter=large";

  request.get(url, function(err, resFromNaver, body){
    res.json({
      data : body
    })
  });
})

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
