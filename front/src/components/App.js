import React from 'react';

// Import components.
import Header from './Header/Header';
import Home from './Home/Home';
import Signs from './Signs/Signs';
import Sign from './Sign/Sign';
import Elements from './Elements/Elements';
import Element from './Element/Element';

import Loader from './Loader/Loader';
import Error from './Error/Error';
// Import style.
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Navigation
      currentPage: props.currentPage || 'Home',
      currentValue: props.currentValue || '',
      isOpen: false,
      windowSize: window.innerWidth,
      // DATAS
      // SIGNS
      dataSigns: {},
      // ELEMENTS
      dataElements: {},
      // CHINESE YEARS
      dataYears: {},
      // ERROR
      error: ''
    }
    this.apiUrl = `${process.env.REACT_APP_NODE_HOST}:${process.env.REACT_APP_NODE_PORT}`;
    this.navigateTo = this.navigateTo.bind(this);
    this.viewNav = this.viewNav.bind(this);
  }

  componentDidMount() {
    this.getWindowSize();
    window.addEventListener('resize', this.getWindowSize.bind(this));
    this.getYears();
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
  async getYears() {
      // Start Loader
      this.setState({isLoading: true});
      // Get years list.
      await fetch(`${this.apiUrl}/signs/years`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({dataYears: result.years});
      })
      .then(() => this.getSigns())
      .catch(() => this.setState({error: 'Erreur de chargement des années. Réessayer plus tard!'}));
  }

  // Récupere les signes chinois.
  async getSigns() {
      // Get Signs list.
      await fetch(`${this.apiUrl}/signs/chinese`).then((res) => res.json())
      .then((result) => {
        this.setState({dataSigns: result.signs});
      })
      .then(() => this.getElements())
      .catch(() => this.setState({error: 'Erreur de chargement des signes. Réessayer plus tard!'}));
  }

  // Récupere les éléments chinois.
  async getElements() {
    // Get Elements list.
    await fetch(`${this.apiUrl}/elements`).then((res) => res.json())
    .then((result) => {
      this.setState({dataElements: result.elements});
    })
    .catch(() => this.setState({error: 'Erreur de chargement des éléments. Réessayer plus tard!'}))
    .finally(() => this.setState({isLoading: false}));
  }

  // Mise en page des composants.
  setComponent() {
    const { currentPage, currentValue, error } = this.state;
    const { dataYears, dataSigns, dataElements } = this.state;
    let page = error || currentPage;
    switch (page) {
      case 'Home':
        return (<Home dataYears={dataYears} dataSigns={dataSigns} navigateTo={this.navigateTo} />);
      case 'Signs':
        return (<Signs dataSigns={dataSigns} navigateTo={this.navigateTo} />);
      case 'Sign':
        return (<Sign id={currentValue} dataSigns={dataSigns} navigateTo={this.navigateTo} />);
      case 'Elements':
        return (<Elements dataElements={dataElements} navigateTo={this.navigateTo} />);
      case 'Element':
        return (<Element id={currentValue} dataElements={dataElements} navigateTo={this.navigateTo} />);
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
