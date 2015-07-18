import React from "react/addons"
import Sparklines from "./sparkline/Sparklines"
import SparklinesLine from "./sparkline/SparklinesLine"
import SparklinesSpots from "./sparkline/SparklinesSpots"

class TweetLine extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return (<div>
            <Sparklines data={this.state.data} limit={20}>
                <SparklinesLine color="#1c8cdc"/>
                <SparklinesSpots />
            </Sparklines>
        </div>);
    }
}
TweetLine.propTypes = {tweets: React.PropTypes.array};
export default TweetLine;