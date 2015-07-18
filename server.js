require('node-jsx').install({extension: '.jsx'});
require("babel/register");
var koa      = require('koa'),
    Router   = require('koa-router'),
    React    = require('react'),
    serve    = require('koa-static'),
    mount    = require('koa-mount'),
    fs       = require('fs'),
    thunkify = require('thunkify-wrap'),
    favicon  = require('koa-favicon'),
    compress = require("koa-compress"),
    twit = require("twit");

var STATIC_FILES_MAP = {};
var SERVE_OPTIONS = {maxAge: 365 * 24 * 60 * 60};

//create our app
var app = koa();

app.use(favicon(__dirname + '/images/favicon.ico'));

//mount our static middleware
app.use(mount('/dist', serve(__dirname + '/dist', {defer: true})));

//render our index.html
var views = require("co-views");
var render = views("views", {map: {html: 'swig'}});
app.use(mount("/", function *( next ) {

    //ignore api and static routes
    if ( this.path.startsWith("/dist") ) {
        return yield next;
    }
    this.body = yield render("index");
}));

var server = require('http').Server(app.callback());
var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

//start the app
var port = process.env.PORT || 3000;
server.listen(port);