import React from "react/addons"
import TweetLine from "./tweetline"

console.log(TweetLine);
export default class TweetLineContainer extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            tweets: []
        }
    }

    render() {
        return (<div>
            <TweetLine tweets={this.state.tweets}/>
        </div>);
    }
}
