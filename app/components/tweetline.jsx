import React from "react/addons"
import {Sparklines,SparklinesLine,SparklinesSpots,SparklinesReferenceLine} from "./sparkline/Sparklines"
import {getRandomInt} from "../utils"

class TweetLine extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            data: [1, 2, 3, 4, 5]
        }
    }

    componentDidMount() {
        setInterval(()=> {
            let data = this.state.data;
            data.push(getRandomInt(0, 100));
            this.setState({data});
        }, 1000);

    }

    getHeight() {

        return document.clientHeight || document.body.clientHeight;
    }

    getWidth() {
        return document.clientWidth || document.body.clientWidth;
    }

    componentWillMount() {
        this.socket = io.connect()
        this.socket.on('tweet', data => this.newTweet(data))
    }

    newTweet(data) {
        console.log('got tweet data', data)
    }

    render() {
        return (<div>
            <Sparklines data={this.state.data} width={this.getWidth()} height={this.getHeight()} limit={20}>
                <SparklinesLine style={{ fill: "#0A2300" }}/>
                <SparklinesSpots />
                <SparklinesReferenceLine type="mean"/>
            </Sparklines>
        </div>);
    }
}
TweetLine.propTypes = {tweets: React.PropTypes.array};
export default TweetLine;