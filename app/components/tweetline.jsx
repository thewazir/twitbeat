import React from "react/addons"
import {Sparklines,SparklinesLine,SparklinesSpots} from "./sparkline/Sparklines"

class TweetLine extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            data: [1, 2, 3, 4, 5]
        }
    }

    getHeight() {
 
        return document.clientHeight || document.body.clientHeight;
    }

    getWidth() {
        return document.clientWidth || document.body.clientWidth;
    }

    render() {
        return (<div>
            <Sparklines data={this.state.data} width={this.getWidth()} height={this.getHeight()} limit={20}>
                <SparklinesLine color="#1c8cdc"/>
                <SparklinesSpots />
            </Sparklines>
        </div>);
    }
}
TweetLine.propTypes = {tweets: React.PropTypes.array};
export default TweetLine;