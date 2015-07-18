import React from "react/addons"
import {Howl} from "howler"
import TweetLine from "./tweetline"

console.log(TweetLine);
export default class TweetLineContainer extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            tweets: []
        }
        this.sound = new Howl({
            urls: ['/dist/sounds/ECGBeepSound.mp3']
        });
    }

    componentWillMount() {
        this.socket = io.connect();
        this.socket.on('tweet', data => this.newTweet(data));
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
