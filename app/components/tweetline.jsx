import React from "react/addons"
import {Sparklines,SparklinesLine,SparklinesSpots,SparklinesReferenceLine} from "./sparkline/Sparklines"
import {getRandomInt} from "../utils"

class TweetLine extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            height: this.getHeight(),
            width: this.getWidth()
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize.bind(this));
    }

    onResize() {
        this.setState({width: this.getWidth(), height: this.getHeight()});
    }

    getHeight() {
        return document.clientHeight || document.body.clientHeight;
    }

    getWidth() {
        return document.clientWidth || document.body.clientWidth;
    }

    render() {
        return (<div>
            <Sparklines data={this.props.tweets.map(t => t.points)} width={this.state.width} height={this.state.height}
                        limit={20}>
                <SparklinesLine style={{ fill: "#2F9B04", color:"#2F9B04", strokeWidth:"5" }}/>
                <SparklinesReferenceLine
                    style={{ stroke:"#4099ff", color: '#4099ff', strokeOpacity: .75, strokeDasharray: '2, 2' }}
                    type="mean"/>
            </Sparklines>
        </div>);
    }
}
TweetLine.propTypes = {tweets: React.PropTypes.array};
export default TweetLine;