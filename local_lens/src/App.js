import React, { Component } from 'react';
import Home from './components/Home';
import ReactGA from 'react-ga';



class App extends Component {

componentDidMount() {
  document.title = "bitagora";
  ReactGA.initialize('UA-101028073-3');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

  render() {
    return (
    <div style={{ height: '100%'}}>
       <Home />
    </div>
    );
  }
}

export default App;
