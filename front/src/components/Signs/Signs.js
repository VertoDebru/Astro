import React from "react";

// Import components.
import Loader from "../Loader/Loader";
// Import style.
import './Signs.css';

export default class Signs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // Signs
            arraySigns: []
        }
    }

    componentDidMount() {
        this.setSigns();
    }

    // Insertion des signes dans un tableau. (Only _id & name)
    setSigns() {
        // Start Loader
        this.setState({isLoading: true});

        let listSigns = [];
        Object.entries(this.props.dataSigns).forEach((sign) => {
            listSigns.push([sign[1]._id, sign[1].name]);
        });
        this.setState({ arraySigns: listSigns, isLoading: false });
    }

    render() {
        const { isLoading } = this.state;
        const { arraySigns } = this.state;
        return (
            <>
            {isLoading ? <Loader /> : (
                <section>
                <h2>Les signes</h2>
                <div className="type">
                    <button disabled>Chinois</button>
                    <button>Occidentaux</button>
                </div>
                <ul>
                    {arraySigns.map((sign,index) => (
                        <li key={'li'+index}>
                            <button key={index} 
                            id={'Sign'} 
                            value={sign[0]} 
                            className={sign[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()} 
                            onClick={this.props.navigateTo} 
                            title={sign.name} />
                        </li>
                    ))}
                </ul>
                </section>
            )}
            </>
        );
    }
}
