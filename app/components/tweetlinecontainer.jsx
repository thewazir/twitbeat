import React from "react/addons"
import TweetLine from "./tweetline"

console.log(TweetLine);
export default class TweetLineContainer extends React.Component {
    render() {
        return (<div>
            <TweetLine {...this.props} />
        </div>);
    }
}
