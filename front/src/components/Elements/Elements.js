import React from "react";

// Import components.
import Loader from "../Loader/Loader";
// Import style.
import "./Elements.css";


export default class Elements extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // elements
            arrayElements: []
        }
    }

    componentDidMount() {
        this.getElements();
    }

    getElements() {
        // Start Loader
        this.setState({isLoading: true});

        let listElements = [];
        Object.entries(this.props.dataElements).forEach((element) => {
            listElements.push([element[1]._id, element[1].name, element[1].icon]);
        });
        this.setState({ arrayElements: listElements, isLoading: false });
    }

    render() {
        const { isLoading } = this.state;
        const { arrayElements } = this.state;
        return (
            <>
            {isLoading ? <Loader /> : (
                <section>
                <h2>Les éléments</h2>
                {/*<p>Les 5 éléments sont des forces essentielles agissant sur l'univers des signes. Mouvance et fluctuance, Yin et Yang, ces forces-symboles sont en perpétuelle action et inter-action. Le terme chinois Hing, qui les désigne, signifie marcher - agir. Elles suivent l'ordre conforme à la succession des saisons.</p>*/}
                <div className="type">
                    <button disabled>Chinois</button>
                    <button>Occidentaux</button>
                </div>
                <ul>
                    {arrayElements.map((element,index) => (
                        <li key={'li'+index}>
                            <button 
                            key={index}
                            id={"Element"}
                            value={element[0]}
                            className={"bx bxs-"+element[2]}
                            onClick={this.props.navigateTo} title={element[1]} />
                        </li>
                    ))}
                </ul>
                </section>
            )}
            </>
        );
    }
}
