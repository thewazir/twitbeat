import React from "react/addons"
import TweetLine from "./tweetline"

export default class TweetLineContainer extends React.Component {
    contructor() {
        this.state = {
            tweets: []
        };
    }

    render() {
        return (<div>
            <TweetLine tweets={this.state.tweets}/>
        </div>);
    }
}
