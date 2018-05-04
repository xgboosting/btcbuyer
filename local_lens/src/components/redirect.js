import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getScreenCap } from '../actions';
import { Redirect } from 'react-router-dom';
 import hourglass from './../assets/hourglass.gif';





const divStyle = {
   flex: 1,
   marginTop: '12%',
};

const formStyle = {
  borderRadius: 4,
 borderWidth: 0.5,
 borderColor: 'black',
 fontSize: '130%'
}

const inputSize = {
  width: '120%',
  fontSize: '100%',
  backgroundColor: 'white',
  color: 'black'
}

class enterUrl extends Component {

  constructor(props) {
  super(props);
  localStorage.removeItem('screenshot_uuid');
  localStorage.removeItem('screenshot_url');
  const wholeurl = window.location.pathname;
  const url = wholeurl.substr(10);
  this.props.getScreenCap(url);
  this.state = {urlValue: '', fireRedirect: true};
  this.urlChange = this.urlChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(event) {

  event.preventDefault();
  if (this.state.urlValue.length > 1) {
    this.setState({ fireRedirect: true })
  }

}

urlChange(event) {
  this.setState({urlValue: event.target.value});
}

  render () {
    if (this.state.fireRedirect === true) {
      return (<Redirect to='/order-form'/>)
    }

  return (
    <div style={divStyle}>
      <img src={hourglass} alt="spinner" />
  </div>

  )
}
}

/*Hello.propTypes = {
 onClick: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired

}*/
const mapStateToProps = state => {
return {
  message: state.auth.message,
 };
};

export default connect(mapStateToProps, {
 getScreenCap
})(enterUrl);
