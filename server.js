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
    compress = require("koa-compress");

var STATIC_FILES_MAP = {};
var SERVE_OPTIONS = {maxAge: 365 * 24 * 60 * 60};

//create our app
var server = koa();

server.use(favicon(__dirname + '/images/favicon.ico'));

//render our index.html
var views = require("co-views");
var render = views("dist", {map: {html: 'swig'}});
server.use(mount("/", function *( next ) {
    //ignore api and static routes
    if ( this.path.startsWith("/dist") ) {
        return yield next;
    }
    this.body = yield render("index");
}));

//mount our static middleware
server.use(mount('/dist', serve(__dirname + '/dist', {defer: true})));

//start the server
var port = process.env.PORT || 3000;
server.listen(port);