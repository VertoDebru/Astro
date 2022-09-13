import React from 'react';

// Import components.
import Header from './Header/Header';
import Home from './Home/Home';
import Sign from './Sign/Sign';
import Signs from './Signs/Signs';

import Loader from './Loader/Loader';
import Error from './Error/Error';
// Import style.
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Navigation
      currentPage: 'Home',
      currentValue: props.currentValue || '',
      isOpen: false,
      windowSize: window.innerWidth,
      // DATAS
      currentDate: new Date(),
      curSignIdYear: null,           // Sign ID where current year.
      // ERROR
      error: ''
    }
    this.apiUrl = `${process.env.REACT_APP_NODE_HOST}:${process.env.REACT_APP_NODE_PORT}/signs`;
    this.navigateTo = this.navigateTo.bind(this);
    this.viewNav = this.viewNav.bind(this);
  }

  componentDidMount() {
    this.getWindowSize();
    window.addEventListener('resize', this.getWindowSize.bind(this));
    this.getCurrentYear();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWindowSize.bind(this));
  }

  // Modification de la page à afficher.
  navigateTo(event) {
    this.setState({ error: '', isOpen: false });
    let myPage = event.target.id;
    if(!myPage) myPage = event.target.parentNode.id;

    let myValue = event.target.value;
    if(!myValue) {
      myValue = event.target.parentNode.value;
      if(!myValue) myValue = '';
    }
    this.setState({ currentPage: myPage, currentValue: myValue });
  }

  // Ouvre/Ferme la navigation pour mobile.
  viewNav(event) {
    const { isOpen } = this.state;
    if(isOpen)
      this.setState({isOpen: false});
    else
      this.setState({isOpen: true});
  }

  // Mise à jour de la taille de l'écran.
  getWindowSize() {
    this.setState({windowSize: window.innerWidth});
    if(window.innerWidth >= 640 && this.state.isOpen ) this.setState({isOpen: false});
  }

  // Récupere les nouvel an chinois.
  getCurrentYear() {
      const { currentDate } = this.state;
      // Start Loader
      this.setState({isLoading: true});
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
                          this.setState({ curSignIdYear: chineseSign });
                      }
                      console.log("... day is not over the new year.");
                      chineseSign++;
                      if(chineseSign > 11) chineseSign = 0;
                      this.setState({ curSignIdYear: chineseSign });
                  }
              }
              // Sinon on renvoi l'id du signe.
              this.setState({ curSignIdYear: chineseSign });
          }
          // Mise à jour pour le prochain signe.
          chineseSign++;
          if(chineseSign > 11) chineseSign = 0;
      });
      // End Loader
      this.setState({isLoading: false});
  }

  // Mise en page des composants.
  setComponent() {
    const { currentPage, currentValue, error } = this.state;
    const { curSignIdYear } = this.state;
    let page = error || currentPage;
    switch (page) {
      case 'Home':
        return (<><Home curSignIdYear={curSignIdYear} navigateTo={this.navigateTo} /></>);
      case 'Sign':
        return (<><Sign id={currentValue} navigateTo={this.navigateTo} /></>);
      case 'Signs':
        return (<><Signs navigateTo={this.navigateTo} /></>);
      default:
        return (<Error error={error} />);
    }
  }

  render() {
    const { isLoading, isOpen, windowSize } = this.state;
    return (
      <>
        <Header isOpen={isOpen} windowSize={windowSize} viewNav={this.viewNav} navigateTo={this.navigateTo} />
        <main>
          { isLoading ? <Loader /> : this.setComponent() }
        </main>
      </>
    )
  }
}
