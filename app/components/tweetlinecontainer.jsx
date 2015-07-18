import React from "react/addons"
import TweetLine from "./tweetline"
import TweetList from "./tweets/tweetList"
import {getRandomInt} from "../utils"

export default class TweetLineContainer extends React.Component {
    render() {
        return (
        <div>
            <TweetLine {...this.props} />
            <TweetList {...this.props} />
        </div>);
    }
}
