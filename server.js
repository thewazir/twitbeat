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
    Twit     = require("twit");

var T = new Twit({
    consumer_key: 'XmNnZgUutpcO6h42kc2ILdNrs',
    consumer_secret: 'Sq8AUpG4329EzWlFiJiJoYHkSBXqt3lxLcVOz4bIXJwbfdtGLD',
    access_token: '273511939-A9NUtcostnLWTdqypUFgQSCpjSSE1dMdpBoTJiyM',
    access_token_secret: 'apLtdMq2DNx6mvA01HG7Ajm4rNnXkCvBub1GBoXznDh3y'
});

var stream = T.stream('statuses/filter', {track: 'javascript'});

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
    this.body = yield render("index", {name: "test"});
}));

var server = require('http').Server(app.callback());
var io = require('socket.io')(server);

var weightTheTweet = function( tweet ) {
    var points = parseInt(tweet.user.followers_count) + parseInt(tweet.retweet_count) + parseInt(tweet.favorite_count);
    return points;
};

io.on('connection', function( socket ) {
    stream.on('tweet', function( tweet ) {
        socket.emit('tweet', {
            text: tweet.text,
            points: weightTheTweet(tweet),
            name: tweet.user.name
        });
    });
    stream.on('error', function (event) {
        console.log(event);
    });
    stream.on('disconnect', function (disconnectMessage) {
        console.log(disconnectMessage);
    })
});

//start the app
var port = process.env.PORT || 3000;
server.listen(port);