import React from "react";

// Import components.
import Loader from "../Loader/Loader";
// Import style.
import './Home.css';
import './ChineseYear.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            curChineseYear: props.curSignIdYear,           // Sign ID where current year.
            // Current Sign Year
            curId: null,                    // Id MonogoDB
            curSignId: null,                // Sign ID
            curSignName: '',                // Sign name
            curDescriptionYear: null,       // Sign description
            // Sign in Year
            arraySignsYear: [],             // List description by sign in current sign ID
            curSignYear: 0,                 // Sign ID Selected
            // ERROR
            error: ''
        }
        this.apiUrl = `${process.env.REACT_APP_NODE_HOST}:${process.env.REACT_APP_NODE_PORT}/signs`;
        this.setSign = this.setSign.bind(this);
        this.setSignByYear = this.setSignByYear.bind(this);
    }

    componentDidMount() {
        this.getChineseSign();
    }

    // Récupere les données du signe chinois actuel.
    getChineseSign(ID) {
        // Start Loader
        this.setState({ isLoading: true });

        const { curSignId, arraySignsYear } = this.state;
        const { curChineseYear } = this.state;
        let signID = ID || (!curSignId ? curChineseYear : curSignId);
        if(ID === 0) signID = 0;

        // Get signs infos.
        fetch(`${this.apiUrl}/chinese`)
        .then((res) => res.json())
        .then((result) => {
            if(arraySignsYear) arraySignsYear.splice(0);
            result.signs.forEach(sign => {
                arraySignsYear.push(sign.year[signID+1][signID]); });

            this.setState({
                curId: result.signs[signID]._id,
                curSignId: signID,
                curChineseSign: result.signs[signID],
                curSignName: result.signs[signID].name.toString(),
                curDescriptionYear: result.signs[signID].year[0].description });
        })
        .catch(() => this.setState({error: 'Erreur de chargement des données. Réessayer plus tard!'}))
        .finally(() => this.setState({isLoading: false }));
    }

    getPrefixForYear(signName) {
        switch (signName) {
            case 'Chèvre':
                return 'de la '+signName;
            default:
                return 'du '+signName;
        }
    }

    // Change le signe chinois actuel.
    setSign(event) {
        const { curSignId } = this.state;
        let isNext = (event.target.value === 'true' ? true : false);
        let goToSign = curSignId;

        document.getElementsByTagName('section')[0].className = 'newYear';

        (isNext ? (goToSign++) : (goToSign--) );
        if(goToSign > 11) goToSign = 0;
        if(goToSign < 0) goToSign = 11;

        this.setState({ curSignId: goToSign });
        this.getChineseSign(goToSign);
    }

    // Change le signe selon le nouvel an chinois actuel.
    setSignByYear(event) {
        this.setState({ curSignYear: parseInt(event.target.value) });
    }

    render() {
        const { isLoading } = this.state;
        const { curSignName, curDescriptionYear, arraySignsYear } = this.state;
        const { curId, curSignId, curChineseYear, curSignYear } = this.state;
        let normalizeSignName = curSignName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return(
            <>
            {isLoading ? <Loader /> : (
                <section className={'newYear ' + normalizeSignName}>
                <div className="nav">
                    <button onClick={this.setSign} value='false' className="bx bxs-left-arrow"></button>
                    <h2>
                        {curChineseYear === curSignId ? <span>Année en cours</span> : null}
                        Année {this.getPrefixForYear(curSignName)}
                    </h2>
                    <button onClick={this.setSign} value='true' className='bx bxs-right-arrow'></button>
                </div>
                <p>{curDescriptionYear}</p>
                <button id={'Sign'} value={curId} onClick={this.props.navigateTo}>+ d'infos</button>

                <article>
                    <div>
                    {/* Add in new component. */}
                    <select value={curSignYear} onChange={this.setSignByYear}>
                        <option value={0}>Rat</option>
                        <option value={1}>Buffle</option>
                        <option value={2}>Tigre</option>
                        <option value={3}>Lapin</option>
                        <option value={4}>Dragon</option>
                        <option value={5}>Serpent</option>
                        <option value={6}>Cheval</option>
                        <option value={7}>Chèvre</option>
                        <option value={8}>Singe</option>
                        <option value={9}>Coq</option>
                        <option value={10}>Chien</option>
                        <option value={11}>Cochon</option>
                    </select>
                    {/* --------------------- */}
                    <h2> dans l'année {this.getPrefixForYear(curSignName)}</h2>
                    </div>
                    <p>{arraySignsYear[curSignYear]}</p>
                </article>
                </section>
            )}
            </>
        )
    }
}
