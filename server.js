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

//mount our static middleware
server.use(mount('/dist', serve(__dirname + '/dist', {defer: true})));

//start the server
var port = process.env.PORT || 3000;
server.listen(port);