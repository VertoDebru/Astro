import React from "react";

// Import components.
import InputYears from "../Forms/Years";
// Import style.
import './Calculator.css';

export default class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            // FORMS
            formYear: document.getElementsByName("Y")[0],
            formMonth: document.getElementsByName("M")[0],
            formDay: document.getElementsByName("D")[0],
            // DATAS
            myYear: null,
            myMonth: null,
            myDay: null,
            myChineseSign: null,
            myChineseSignId: null,
            myChineseName: null,
            myChineseElement: null,
            myChineseSignDescription: null,
            // MONTHS
            arrayMonths: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
            // DAYS
            arrayDays: [],
            // NAVIGATION
            curStep: 0
        }
        this.backStep = this.backStep.bind(this);
        this.switchStep = this.switchStep.bind(this);
    }

    componentDidMount() {
        this.setState({ formYear: document.getElementsByName("Y")[0], formMonth: document.getElementsByName("M")[0], formDay: document.getElementsByName("D")[0] })
    }

    // Switch to next step.
    switchStep() {
        const { formYear, formMonth, formDay } = this.state;
        const { curStep } = this.state;
        let step = curStep;
        // Get value in input
        if(step === 0) {
            if(formYear.value) {
                step = step+1;
                this.setState({ curStep: step, myYear: parseInt(formYear.value) });
            }
        }
        if(step === 1) {
            if(formMonth.value) {
                step = step+1;
                this.setState({ curStep: step, myMonth: parseInt(formMonth.value) });
                // Loading days by month selected
                this.getDays(parseInt(formMonth.value));
            }
        }
        if(step === 2) {
            if(formDay.value) {
                step = step+1;
                this.setState({ curStep: step, myDay: parseInt(formDay.value) });
                // Calculate sign by date enter
                this.calculate(new Date(parseInt(formYear.value),parseInt(formMonth.value),parseInt(formDay.value)));
            }
        }
        // Scrolling to next step.
        this.scrollStep(step);
    }

    // Back to before step.
    backStep() {
        const { formMonth, formDay } = this.state;
        const { curStep } = this.state;
        let step = curStep;
        // Get value in input
        if(step === 1) {
            step = step-1;
            this.setState({ curStep: step, myMonth: null });
            if(formMonth.value) { formMonth.value = ""; }
        }
        if(step === 2) {
            step = step-1;
            this.setState({ curStep: step, myDay: null });
            if(formDay.value) { formDay.value = ""; }
        }
        // Restart form
        if(step === 3) {
            step = 0;
            formMonth.value = "";
            formDay.value = "";
            this.setState({ curStep: step, myMonth: null, myDay: null });
        }

        // Scrolling to back step.
        this.scrollStep(step);
    }

    // Scrolling to step.
    scrollStep(step) {
        const container_form = document.getElementsByClassName("container_form")[0];
        const widthContainer = container_form.clientWidth;
        let scrollX = step * widthContainer;
        container_form.scrollTo({
            left: scrollX,
            behavior: 'smooth'
        });
    }

    // Get days by month selected.
    getDays(month) {
        const { arrayDays } = this.state;
        if(arrayDays.length > 0) arrayDays.splice(0,arrayDays.length);
        let max = 31;
        if((month === 3) || (month === 5) || (month === 8) || (month === 10)) max = 30;
        if((month === 1)) max = 29;

        for (let i = 1; i <= max; i++) arrayDays.push(i);
    }

    // Calculate sign by date received.
    calculate(myDate) {
        let chineseSign = 0;
        let myYear = myDate.getFullYear();
        let elementSign = this.getSignElement(myYear);
    
        console.warn('Born : '+myDate);
        // Calcul de l'année chinoise selon la date d'anniversaire.
        this.props.dataYears.forEach(newYear => {
            const d = new Date(newYear.year).getDate();
            const m = new Date(newYear.year).getMonth()+1;
            const y = new Date(newYear.year).getFullYear();
            // Si l'année actuelle correspond a la date du nouvel an.
            if(myYear === y) {
                // Si le mois actuel est en dessous ou égal à 2
                if(myDate.getMonth()+1 <= 2) {
                    if(myDate.getMonth()+1 === m) {
                        // Si le jour actuel est au dessus ou égal au jour du nouvel an
                        if(myDate.getDate() >= d) {
                            console.log("... day is over the new year.");
                            this.setState({ myChineseSign: chineseSign });
                        }
                        else {
                            console.log("... day is not over the new year.");
                            chineseSign--;
                            if(chineseSign === -1) chineseSign = 11;
                            this.setState({ myChineseSign: chineseSign });
                        }
                        this.getSignById(chineseSign,elementSign);
                    }
                }
                // Sinon on renvoi l'id du signe.
                this.setState({ myChineseSign: chineseSign });
                console.warn('Year : '+new Date(newYear.year));
                this.getSignById(chineseSign,elementSign);
            }
            // Mise à jour pour le prochain signe.
            chineseSign++;
            if(chineseSign > 11) chineseSign = 0;
        });
    }

    getSignElement(year) {
        let y = year.toString();
        let lastNum = parseInt(y.substr(y.length-1));
        let elementId = 0;
        if(lastNum >= 2) elementId = 1;
        if(lastNum >= 4) elementId = 2;
        if(lastNum >= 6) elementId = 3;
        if(lastNum >= 8) elementId = 4;
        return elementId;
    }

    // Récupere le signe chinois actuel.
    getSignById(idSign,idElement) {
        this.props.dataSigns.forEach((sign, index) => {
            if(idSign === index) this.setState({ myChineseSignId: sign._id, myChineseName: sign.name, myChineseSignDescription: sign.elements[idElement][idElement] });
        });
        this.props.dataElements.forEach((element, index) => {
            if(idElement === index) this.setState({ myChineseElement: element.name });
        });
    }

    render() {
        const { myYear } = this.state;
        const { arrayMonths, myMonth } = this.state;
        const { arrayDays, myDay } = this.state;
        const { curStep } = this.state;
        const { myChineseSignId, myChineseSign, myChineseName, myChineseElement, myChineseSignDescription } = this.state;
        //let normalizeSignName = myChineseName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return (
            <>
            <section>
                <h2>Mon signe</h2>
                <p>{curStep === 3 ? (<>Date de naissance : {myDay} {arrayMonths[myMonth]} {myYear}</>) : (<>Calcul de votre signe.</>)}</p>
                
                <div className="container_form">
                    {/* Year selection */}
                    <div>
                        <span>Année de naissance</span>
                        <InputYears dataYears={this.props.dataYears} />
                    </div>
                    {/* Month selection */}
                    <div>
                        <span>Mois de naissance</span>
                        <select name="M" className="months">
                            <option value={""}>Sélectionnez le mois</option>
                            {arrayMonths.map((month,index) => (
                                <option key={index} value={index}>{month}</option>
                            ))}
                        </select>
                    </div>
                    {/* Day selection */}
                    <div>
                        <span>Jour de naissance</span>
                        <select name="D" className="days">
                            <option value={""}>Sélectionnez le jour</option>
                            {arrayDays.map((day,index) => (
                                <option key={index} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                    {/* Result */}
                    <div>
                        <article>
                            <p>{myChineseName} {myChineseElement}</p>
                            <p>{myChineseSignDescription}</p>
                        </article>
                        {myChineseSignId ? <button id={'Sign'} value={myChineseSignId} onClick={this.props.navigateTo}>+ d'infos</button> : null}
                        
                    </div>
                </div>

                <div className="nav_calculate">
                    {/* Back / Retry button */}
                    {curStep === 0 ? (<button onClick={this.backStep} disabled>Retour</button>) : null }
                    {curStep === 1 || curStep === 2 ? (<button onClick={this.backStep}>Retour</button>) : null }
                    {curStep === 3 ? (<button onClick={this.backStep}>Recommencer</button>) : null}
                    {/* Next / Calculate button */}
                    {curStep === 0 || curStep === 1 ? (<button onClick={this.switchStep}>Suivant</button>) : null}
                    {curStep === 2 ? (<button onClick={this.switchStep}>Calculer</button>) : null}
                </div>
            </section>
            </>
        );
    }
}