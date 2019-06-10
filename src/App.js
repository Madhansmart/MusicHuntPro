import React , { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';

import MainContent from './Main/MainContent';
import Section from './Components/Section/Section';



import logo from './Images/logo.png';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isUserActive : false
    }
  }

  componentDidMount = ()=> {
      if(localStorage.getItem("musicHunt")!==undefined){
        this.setState({isUserActive : true});
      }
  }

  render(){
    return (
      <div className="App">
      <ToastContainer />
        <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
          <img src={logo} alt="Music Hunt" className="nav-img"/>
          <a className="navbar-brand" href="/"><h3>Music Hunt</h3></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                <i className="fa fa-user-circle-o"></i></a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="section-content-main">
          <Section />
        </div>
      </div>
    );
  }
}

export default App;
