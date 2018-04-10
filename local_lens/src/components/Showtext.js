import React from 'react';
import ReactRevealText from 'react-reveal-text';

class Showtext extends React.Component {

  constructor() {
    super();
    this.state = { show: false, secondshow: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 500);
    setTimeout(() => {
      this.setState({ secondshow: true });
    }, 1000);
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>

          <ReactRevealText show={this.state.show}>
             welcome to example.com, this site allows you to buy anything on the web with crypto currency!
          </ReactRevealText>


          <ReactRevealText show={this.state.secondshow}>
             simply paste the url of what you want to buy into ^^ that box up there, verify it is the correct product, enter your shipping info and send us a payment!!
          </ReactRevealText>
    
      </div>
    );
  }
}

export default Showtext;
