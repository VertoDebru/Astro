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
            curDescription: null
        }
    }

    componentDidMount() {
        this.getSignById();
    }
    
    // Récupere le signe chinois actuel.
    getSignById() {
        // Start Loader
        this.setState({isLoading: true});

        Object.entries(this.props.dataSigns).forEach((sign) => {
            if(sign[1]._id === this.state.curSignId)
                this.setState({ curSignName: sign[1].name, curDescription: sign[1].description, isLoading: false });
        });
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
