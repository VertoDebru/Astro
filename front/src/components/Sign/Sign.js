import React from "react";

// Import components.
import Loader from "../Loader/Loader";
// Import style.
import './Sign.css';

export default class Sign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // Current Sign
            curSignId: props.id,
            curSignName: '',
            curDescription: null,
            // ERROR
            error: ''
        }
        this.apiUrl = `${process.env.REACT_APP_NODE_HOST}:${process.env.REACT_APP_NODE_PORT}/signs`;
    }

    componentDidMount() {
        this.getSignById();
    }
    
    // Récupere le signe chinois actuel.
    getSignById() {
        // Start Loader
        this.setState({isLoading: true});

        const { curSignId } = this.state;
        // Get categories infos.
        fetch(`${this.apiUrl}/chinese/${curSignId}`)
        .then((res) => res.json())
        .then((result) => {
            // Stockage des données.
            this.setState({ 
                curSignName: result.sign.name,
                curDescription: result.sign.description,
                isLoading: false });
        })
        .catch((err) => this.setState({error: 'Erreur de chargement des données. Réessayer plus tard!'}));
    }

    getPrefixForSign(signName) {
        switch (signName) {
            case 'Chèvre':
                return 'La '+signName;
            default:
                return 'Le '+signName;
        }
    }

    render() {
        const { isLoading } = this.state;
        const { curSignName, curDescription } = this.state;
        let normalizeSignName = curSignName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return(
            <>
            <section>
            {isLoading ? <Loader /> : (
                <>
                <div className={normalizeSignName}>
                    <h2>{this.getPrefixForSign(curSignName)}</h2>
                </div>
                <article>
                <p>{curDescription}</p>
                </article>
                </>
            )}
            </section>
            </>
        );
    }
}
