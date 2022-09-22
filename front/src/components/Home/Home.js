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
            // DATAS
            curChineseYear: null,           // Sign ID by current year. (check)
            currentDate: new Date(),
            // Current Sign Year
            curId: null,                    // Id MonogoDB (_id)
            curSignId: 0,                   // Sign ID (position sign in array list)
            curSignName: '',                // Sign name
            curDescriptionYear: null,       // Sign description
            // Sign in Year
            curSignInYear: 0,               // Sign ID Selected
            // ERROR
            error: ''
        }
        this.setSign = this.setSign.bind(this);
        this.setSignByYear = this.setSignByYear.bind(this);
    }

    componentDidMount() {
        this.getSignByYear(this.props.dataYears, this.state.currentDate);
    }

    // Récupere le signe chinois actuel selon le nouvel an chinois.
    getSignByYear(data, date) {
        // Start Loader
        this.setState({ isLoading: true });
        let chineseSign = 0;
        let tmpSign = 0;
        let myYear = date.getFullYear();
        Object.entries(data).forEach(year => {
            const d = new Date(year[1].year).getDate();
            const m = new Date(year[1].year).getMonth()+1;
            const y = new Date(year[1].year).getFullYear();
            // Si l'année actuelle correspond a la date du nouvel an.
            if(myYear === y) {
                // Si le mois actuel est en dessous ou égal à 2
                if(date.getMonth()+1 <= 2) {
                    console.log(`Check Day...`);
                    if(date.getMonth()+1 === m) {
                        // Si le jour actuel est au dessus ou égal au jour du nouvel an
                        if(date.getDate() >= d) {
                            console.log("... day is over the new year.");
                            tmpSign = chineseSign;
                            this.setState({ curChineseYear: chineseSign, curSignId: chineseSign }); }

                        console.log("... day is not over the new year.");
                        chineseSign++;
                        if(chineseSign > 11) chineseSign = 0;
                        tmpSign = chineseSign;
                        this.setState({ curChineseYear: chineseSign, curSignId: chineseSign });
                    }
                }
                // Sinon on renvoi l'id du signe.
                tmpSign = chineseSign;
                this.setState({ curChineseYear: chineseSign, curSignId: chineseSign });
            }
            // Mise à jour pour le prochain signe.
            chineseSign++;
            if(chineseSign > 11) chineseSign = 0;
        });
        
        this.getChineseSign(tmpSign);
    }

    // Récupere les données du signe chinois actuel.
    getChineseSign(ID) {
        // Start Loader
        this.setState({ isLoading: true });

        const { curSignId, curChineseYear } = this.state;
        let signID = parseInt(ID) || (!curSignId ? curChineseYear : curSignId);
        if(ID === 0) signID = 0;

        Object.entries(this.props.dataSigns).forEach(sign => {
            if(parseInt(sign[0]) === signID) {
                this.setState({
                    curId: sign[1]._id,
                    curSignId: parseInt(sign[0]),
                    curSignName: sign[1].name.toString(),
                    curDescriptionYear: sign[1].year[0].description,
                    isLoading: false });
            }
        });
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
        let goToSign = parseInt(curSignId);

        document.getElementsByTagName('section')[0].className = 'newYear';

        (isNext ? (goToSign++) : (goToSign--) );
        if(goToSign > 11) goToSign = 0;
        if(goToSign < 0) goToSign = 11;

        this.setState({ curSignId: goToSign });
        this.getChineseSign(goToSign);
    }

    // Change le signe selon le nouvel an chinois actuel.
    setSignByYear(event) {
        this.setState({ curSignInYear: parseInt(event.target.value) });
    }

    render() {
        const { isLoading } = this.state;
        const { curSignName, curDescriptionYear } = this.state;
        const { curId, curSignId, curChineseYear, curSignInYear } = this.state;
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
                    <select value={curSignInYear} onChange={this.setSignByYear}>
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
                    <p>{this.props.dataSigns[curSignInYear]?.year[curSignId+1][curSignId]}</p>
                </article>
                </section>
            )}
            </>
        )
    }
}
