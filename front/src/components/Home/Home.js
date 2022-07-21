import React from "react";
// Import components.
import ChineseYear from "../ChineseYear/ChineseYear";
// Import style.
import './Home.css';

export default class Home extends React.Component {

    render() {
        return(
            <>
            <ChineseYear navigateTo={this.props.navigateTo} />
            </>
        )
    }
}
