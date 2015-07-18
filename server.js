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
    Twit = require("twit");

var T = new Twit({
  consumer_key: 'XIa0eK7I6GwG39LQiJxhtgXip',
  consumer_secret: 'AvymuinH9aQtkqewS05CTipo9Iw6tTUjUffVTsjSjI98V1fiaf',
  access_token: '130719275-m5rCvuZKae859YXiKYrwrJqJ9FeDT3gS0KGl5hoG',
  access_token_secret: '5nXNkesuj8oDZphQzQtIyboDyreSMHONAPzEEFmibRu0R'
});

var stream = T.stream('statuses/filter', { track: 'javascript'});

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
    this.body = yield render("index",{ name: "test" });
}));

var server = require('http').Server(app.callback());
var io = require('socket.io')(server);

var weightTheTweet = function(tweet){
    var points = parseInt(tweet.user.followers_count) + parseInt(tweet.retweet_count) + parseInt(tweet.favorite_count);
    return points;
};

io.on('connection', function(socket){
console.log('user connected');
   stream.on('tweet', function(tweet) {
    console.log(tweet.user.name + "::" + tweet.text);
    socket.emit('tweet', { 
        text: tweet.text,
        points: weightTheTweet(tweet),
        name: tweet.user.name
    });
  });
});

//start the app
var port = process.env.PORT || 3000;
server.listen(port);