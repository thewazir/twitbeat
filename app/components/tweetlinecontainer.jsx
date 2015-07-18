import React from "react/addons"
import {Howl} from "howler"
import TweetLine from "./tweetline"
import {getRandomInt} from "../utils"

export default class TweetLineContainer extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            tweets: []
        };
        this.sound = new Howl({
            urls: ['/dist/sounds/ECGBeepSound.mp3']
        });
    }

    componentWillMount() {
        this.socket = io.connect();
        //this.socket.on('tweet', data => this.newTweet(data));
        setInterval(()=> {
            let data = {points: getRandomInt(0, 1000)};
            this.newTweet(data);
        }, 500);
    }

    newTweet( data ) {
        let tweets = this.state.tweets;
        this.sound.play();
        tweets.push(data);
        this.setState({tweets});
    }

    render() {
        return (<div>
            <TweetLine tweets={this.state.tweets}/>
        </div>);
    }
}
