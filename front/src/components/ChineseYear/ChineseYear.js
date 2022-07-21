import React from "react";

// Import style.
import './ChineseYear.css';

export default class ChineseYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            currentDate: new Date(),
            curChineseYear: null,
            // Current Sign Year
            curDescriptionYear: null,
            curSignId: null,
            curSignName: '',
            // ERROR
            error: ''
        }
        this.apiUrl = `${process.env.REACT_APP_NODE_HOST}:${process.env.REACT_APP_NODE_PORT}/signs`;
        this.setSign = this.setSign.bind(this);
    }

    componentDidMount() {
        this.getCurrentYear();
    }

    // Récupere les nouvel an chinois.
    getCurrentYear() {
        // Start Loader
        this.setState({isLoading: true});

        const { currentDate } = this.state;
        // Get categories infos.
        fetch(`${this.apiUrl}/years`)
        .then((res) => res.json())
        .then((result) => {
            this.getSignByYear(result.years, currentDate);
        })
        .catch((err) => this.setState({error: 'Erreur de chargement des années. Réessayer plus tard!'}));
    }
    
    // Récupere le signe chinois actuel selon le nouvel an chinois.
    getSignByYear(data, date) {
        let chineseSign = 0;
        let myYear = date.getFullYear();
        data.forEach(year => {
            const d = new Date(year.year).getDate();
            const m = new Date(year.year).getMonth()+1;
            const y = new Date(year.year).getFullYear();
            // Si l'année actuelle correspond a la date du nouvel an.
            if(myYear === y) {
                // Si le mois actuel est en dessous ou égal à 2
                if(date.getMonth()+1 <= 2) {
                    console.log(`Check Day...`);
                    if(date.getMonth()+1 === m) {
                        // Si le jour actuel est au dessus ou égal au jour du nouvel an
                        if(date.getDate() >= d) {
                            console.log("... day is over the new year.");
                            this.setState({ curSignId: chineseSign, curChineseYear: chineseSign });
                        }
                        console.log("... day is not over the new year.");
                        chineseSign++;
                        if(chineseSign > 11) chineseSign = 0;
                        this.setState({ curSignId: chineseSign, curChineseYear: chineseSign });
                    }
                }
                // Sinon on renvoi l'id du signe.
                this.setState({ curSignId: chineseSign, curChineseYear: chineseSign });
            }
            // Mise à jour pour le prochain signe.
            chineseSign++;
            if(chineseSign > 11) chineseSign = 0;
        });
        
        // Get sign infos.
        this.getChineseSign();
    }

    // Récupere le signe chinois actuel.
    getChineseSign() {
        // Get signs infos.
        fetch(`${this.apiUrl}/chinese`)
        .then((res) => res.json())
        .then((result) => {
            this.setState({
                curChineseSign: result.signs[this.state.curSignId],
                curSignName: result.signs[this.state.curSignId].name.toString(),
                curDescriptionYear: result.signs[this.state.curSignId].year[0].description,
                isLoading: false });
        })
        .catch((err) => this.setState({error: 'Erreur de chargement des données. Réessayer plus tard!'}));
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
        // Start Loader
        this.setState({ isLoading: true });
        document.getElementsByTagName('section')[0].className = 'newYear';

        const { curSignId } = this.state;
        let isNext = (event.target.value === 'true' ? true : false);
        let goToSign = curSignId;
        if(isNext) {
            if(curSignId === 11) goToSign = 0;
            else goToSign = curSignId+1;
        }
        else {
            if(curSignId === 0) goToSign = 11;
            else goToSign = curSignId-1;
        }
        this.setState({ curSignId: goToSign });
        // Get sign infos.
        this.getChineseSign();
    }

    render() {
        const { isLoading } = this.state;
        const { curSignName, curDescriptionYear } = this.state;
        const { curSignId, curChineseYear} = this.state;
        let normalizeSignName = curSignName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return(
            <>
            <section className={'newYear ' + normalizeSignName}>
            {isLoading ? <p>Loading...</p> : (
                <>
                {curChineseYear === curSignId ? <p>Année en cours</p> : null}
                <div>
                    <button onClick={this.setSign} value='false' className="bx bxs-left-arrow"></button>
                    <h2>Année {this.getPrefixForYear(curSignName)}</h2>
                    <button onClick={this.setSign} value='true' className='bx bxs-right-arrow' ></button>
                </div>
                <p>{curDescriptionYear}</p>
                <button id={'Sign'} onClick={this.props.navigateTo}>Plus d'infos ...</button>
                </>
            )}
            </section>
            </>
        );
    }
}
