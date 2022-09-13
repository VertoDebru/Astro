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
            arraySigns: [],
            // ERROR
            error: ''
        }
        this.apiUrl = `${process.env.REACT_APP_NODE_HOST}:${process.env.REACT_APP_NODE_PORT}/signs`;
    }

    componentDidMount() {
        this.getSigns();
    }

    getSigns() {
        // Start Loader
        this.setState({isLoading: true});

        let listSigns = [];
        // Get categories infos.
        fetch(`${this.apiUrl}/chinese`)
        .then((res) => res.json())
        .then((result) => {
            // Stockage des données.
            result.signs.forEach(sign => {
                listSigns.push([sign._id.toString(), sign.name.toString()]);
            });
            this.setState({ arraySigns: listSigns, isLoading: false });
        })
        .catch((err) => this.setState({error: 'Erreur de chargement des données. Réessayer plus tard!'}));
    }

    render() {
        const { isLoading } = this.state;
        const { arraySigns } = this.state;
        return (
            <>
            {isLoading ? <Loader /> : (
                <ul>
                    {arraySigns ? arraySigns.map((sign) => (
                        <li key={'li'+sign[0]}>
                            <button 
                            key={sign[0]}
                            id={'Sign'}
                            value={sign[0]}
                            className={sign[1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}
                            onClick={this.props.navigateTo}>{sign[1]}</button>
                        </li>
                    )) : (<p>Erreur de chargement des signes!</p>)}
                </ul>
            )}
            </>
        );
    }
}
