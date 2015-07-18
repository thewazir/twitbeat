import React from "react/addons"

export default  class TweetList extends React.Component {
    constructor( props ) {
        super(props);
    }

    render(){

        let tweets = this.props.tweets.map((t, idx) => {
            return <li key={idx}>
            <a className="tweetLink" href={t.url}>{t.name}:{t.text}-{t.points}</a>
            </li>
        });
        console.log(this.props.tweets);

       return (
        
        <div className="text-container">
            <h1>Tweets</h1>
            <ul className="tweetList">
                {tweets}
            </ul>
        </div>)
    }

}