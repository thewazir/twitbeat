import React from "react/addons"

export default  class TweetList extends React.Component {
    constructor( props ) {
        super(props);
    }

    render() {

        let tweets = this.props.tweets.reverse().map(( t, idx ) => {
            return <li key={idx}>
                <a target="_blank" className="tweetLink" href={t.url}><h4>{t.name}</h4><p>{t.text}</p><p className="cactus-points">Cactus Points: {t.points}</p></a>
            </li>
        });
        console.log(this.props.tweets);

        return (

            <div className="text-container">
                <div id="logo"></div>
                <ul className="tweetList">
                    {tweets}
                </ul>
            </div>)
    }

}