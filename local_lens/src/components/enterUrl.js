import React, {Component} from 'react';
import Showtext from './Showtext';
import { connect } from 'react-redux';
import { getScreenCap } from '../actions';
import { Redirect } from 'react-router-dom';
import { Form,
         FormGroup,
         Col,
         ControlLabel,
         FormControl,
         Button
 } from 'react-bootstrap';




const divStyle = {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center',
   marginTop: '12%',
   marginLeft: '20%'
};

const formStyle = {
  borderRadius: 4,
 borderWidth: 0.5,
 borderColor: 'black',
 fontSize: '130%'
}

const inputSize = {
  width: '120%',
  fontSize: '140%',
  backgroundColor: '#eacb94',
  color: 'black'
}

class enterUrl extends Component {

  constructor(props) {
  super(props);
  localStorage.removeItem('screenshot_uuid');
  localStorage.removeItem('screenshot_url');
  console.log(`this should alwaysbe be undefined ${localStorage.getItem('screenshot_uuid')}`)
  this.state = {urlValue: '', fireRedirect: false};
  this.urlChange = this.urlChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

}

handleSubmit(event) {
  console.log('here');
  event.preventDefault();
  if (this.state.urlValue.length > 1) {
    this.setState({ fireRedirect: true })
    this.props.getScreenCap(this.state.urlValue);
  }

}

urlChange(event) {
  console.log(this.state.urlValue);
  this.setState({urlValue: event.target.value});
}

  render () {
    if (this.state.fireRedirect === true) {
      return (<Redirect to='/order-form'/>)
    }
    if (window.innerWidth <= 500) {
      return (
        <div>
      <Form horizontal onSubmit={this.handleSubmit}>
    <FormGroup controlId="formHorizontalEmail">
     <Col componentClass={ControlLabel} sm={1}>
       URL
     </Col>
     <Col sm={4}>
        <FormControl value={this.state.urlValue} onChange={this.urlChange} type="url" placeholder="http://www.example.com/" style={inputSize}/>
        <Button style={{marginTop: '2%'}} bsStyle='primary' type="submit">create order</Button>
     </Col>
    </FormGroup>
    </Form>
    <Showtext />
      </div>
      )
    }
  return (
    <div style={divStyle}>
  <Form horizontal style={formStyle} onSubmit={this.handleSubmit}>
<FormGroup controlId="formHorizontalEmail">
 <Col componentClass={ControlLabel} sm={2}>
   URL
 </Col>
 <Col sm={4}>
    <FormControl value={this.state.urlValue} onChange={this.urlChange} type="url" placeholder="http://www.example.com/" style={inputSize}/>
    <Button style={{marginTop: '2%'}} bsStyle='primary' type="submit">create order</Button>
 </Col>
</FormGroup>



</Form>
<Showtext />
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
  console.log(state)
return {
  message: state.auth.message,
 };
};

export default connect(mapStateToProps, {
 getScreenCap
})(enterUrl);
