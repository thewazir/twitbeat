import React from "react/addons"

class TweetList extends React.Component {
    constructor( props ) {
        super(props);
    }

    render(){
        <div className="text-container">
            <h1>text-container</h1>
        </div>
    }

}


TweetLine.propTypes = {tweets: React.PropTypes.array};
export default TweetList;