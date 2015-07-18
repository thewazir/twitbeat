import React from "react/addons"
import TweetLine from "./tweetline"
import {getRandomInt} from "../utils"

export default class TweetLineContainer extends React.Component {
    render() {
        return (<div>
            <TweetLine {...this.props} />
        </div>);
    }
}
