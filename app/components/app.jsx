import React from "react/addons"
import {Howl} from "howler"
import TweetLineContainer from "./tweetlinecontainer"


export default class App extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            tweets: []
        }
        this.sound = new Howl({
            urls: ['/dist/sounds/ECGBeepSound.mp3']
        });
    }

    render() {
        return (<div>
            <TweetLineContainer tweets={this.state.tweets} />
        </div>);
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
}
