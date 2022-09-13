import React from "react";

// Import style.
import './Error.css';

export default class Error extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: props.error || 'En cours de développement...',
        }
    }
    
    render() {
        const { error } = this.state;
        return (<p className="error">{error}</p>);
    }
}
