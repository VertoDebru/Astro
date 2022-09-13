import React from "react";
// Import style.
import './Header.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
      windowSize: this.props.windowSize,
      viewNav: this.props.viewNav
    }
  }

  // !!! Warning: componentWillReceiveProps has been renamed.
  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) this.setState({ isOpen: nextProps.isOpen });
    if (nextProps.windowSize !== this.state.windowSize) this.setState({ windowSize: nextProps.windowSize });
  }

  render() {
    const { isOpen, windowSize, viewNav } = this.state;
    return(
      <>
      {/* Navigation Mobile */}
      {isOpen && windowSize <= 640 ? (
        <div className="nav-mobile open">
          <ul>
              <li id={'Signs'} onClick={this.props.navigateTo}>Les signes</li>
              <li id={'Elements'} onClick={this.props.navigateTo}>Les éléments</li>
              <li id={'Calculator'} onClick={this.props.navigateTo}>Mon signe</li>
              <li id={'Contact'} onClick={this.props.navigateTo}>Compatibilités</li>
          </ul>
          <p>Créer par Tony Vervoot</p>
        </div>
      ) : (null)}

      <header>
        <nav>
          <ul>
            <li id={'Signs'} onClick={this.props.navigateTo}>Les signes</li>
            <li id={'Elements'} onClick={this.props.navigateTo}>Les éléments</li>
            <li>
              <div id={'Home'} onClick={this.props.navigateTo} className='App-logo'><i className="bx bxs-star"></i><h1>Astro</h1></div>
            </li>
            <li id={'Calculator'} onClick={this.props.navigateTo}>Mon signe</li>
            <li id={'Contact'} onClick={this.props.navigateTo}>Compatibilités</li>
            <li onClick={viewNav}>
              {isOpen ? <i className="bx bx-x"></i> : <i className="bx bx-menu"></i>}
            </li>
          </ul>
        </nav>
      </header>
      </>
    )
  }
}
