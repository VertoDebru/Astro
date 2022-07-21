import React from 'react';

// Import components.
import Header from './Header/Header';
import Home from './Home/Home';
import Error from './Error/Error';
// Import style.
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Navigation
      currentPage: props.currentPage,
      isOpen: false,
      windowSize: window.innerWidth,
      // ERROR
      error: ''
    }
    this.navigateTo = this.navigateTo.bind(this);
    this.viewNav = this.viewNav.bind(this);
  }

  componentDidMount() {
    this.getWindowSize();
    window.addEventListener('resize', this.getWindowSize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWindowSize.bind(this));
  }

  // Modification de la page à afficher.
  navigateTo(event) {
    let myPage = event.target.id;
    //let myValue = event.target.value;
    if(!myPage) myPage = event.target.parentNode.id;
    this.setState({ currentPage: myPage, error: '', isOpen: false });
    
    if(myPage !== 'Home') this.setState({ error: 'Erreur de chargement de la page. Réessayer plus tard!' });

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

  // Mise en page des composants.
  setComponent() {
    const { currentPage, error } = this.state;
    switch (currentPage) {
      case 'Home':
        return (<><Home navigateTo={this.navigateTo} /></>);
      default:
        return (<Error error={error} />);
    }
  }

  render() {
    const { isOpen, windowSize } = this.state;
    return (
      <>
        <Header isOpen={isOpen} windowSize={windowSize} viewNav={this.viewNav} navigateTo={this.navigateTo} />
        { this.setComponent() }
      </>
    )
  }
}
