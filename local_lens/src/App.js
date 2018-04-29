import React, { Component } from 'react';
import Home from './components/Home';


class App extends Component {

componentDidMount() {
  document.title = "bitagora";
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
