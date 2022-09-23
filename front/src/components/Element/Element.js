import React from "react";

// Import components.
import Loader from "../Loader/Loader";
// Import style.
import "./Element.css";


export default class Element extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // Current Element
            curElementId: props.id,
            curElementName: '',
            curDescription: '',
            curUnivers: ''
        }
    }

    componentDidMount() {
        this.getElements();
    }

    getElements() {
        // Start Loader
        this.setState({isLoading: true});

        Object.entries(this.props.dataElements).forEach((element) => {
            if(element[1]._id === this.state.curElementId)
                this.setState({ 
                    curElementName: element[1].name,
                    curDescription: element[1].description,
                    curUnivers: element[1].univers,
                    curNumber: element[1].number,
                    isLoading: false });
        });
    }

    render() {
        const { isLoading } = this.state;
        const { curElementName, curDescription, curUnivers, curNumber } = this.state;
        return (
            <>
            {isLoading ? <Loader /> : (
                <section>
                <h2>{curElementName}</h2>
                <p>{curDescription}</p>
                <span>Univers</span>
                <p>{curUnivers}</p>
                <span>Nombre</span>
                <p>{curNumber}</p>
                </section>
            )}
            </>
        );
    }
}
