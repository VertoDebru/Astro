import React from "react";

// Import style.
import './Error.css';

export default class Error extends React.Component {
    render() {
        return (<p className="error">{this.props.error}</p>)
    }
}
