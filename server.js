require('node-jsx').install({extension: '.jsx'});
require("babel/register");
const koa      = require('koa'),
    Router   = require('koa-router'),
    React    = require('react'),
    serve    = require('koa-static'),
    mount    = require('koa-mount'),
    fs       = require('fs'),
    thunkify = require('thunkify-wrap'),
    favicon  = require('koa-favicon'),
    compress = require("koa-compress");

const STATIC_FILES_MAP = {};
const SERVE_OPTIONS = {maxAge: 365 * 24 * 60 * 60};

//create our app
const app = koa();

app.use(favicon(__dirname + '/images/favicon.ico'));

//mount our static middleware
app.use(mount('/dist', serve(__dirname + '/dist', {defer: true})));

//render our index.html
const views = require("co-views");
const render = views("dist", {map: {html: 'swig'}});
app.use(mount("/", function *( next ) {
    this.body = yield render("index");
}));

const server = require('http').Server(app.callback());
const io = require('socket.io')(server);


//socket.io
io.on('connection', function(){
    console.log('hi');
});

//start the server
const port = process.env.PORT || 3000;
server.listen(port);