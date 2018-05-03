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
         Button,
         Panel
 } from 'react-bootstrap';




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
  this.state = {urlValue: '', fireRedirect: false};
  this.urlChange = this.urlChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

}

handleSubmit(event) {

  event.preventDefault();
  if (this.state.urlValue.length > 1) {
    this.setState({ fireRedirect: true })
    this.props.getScreenCap(this.state.urlValue);
  }

}

urlChange(event) {
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
      1.5% fee for individuals, cheapest on the net
     </Col>
     <Col sm={4}>
        <FormControl value={this.state.urlValue} onChange={this.urlChange} type="url" placeholder="https://www.etsy.com/" style={inputSize}/>
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
      <Panel style={{marginLeft:'5%', marginRight: '5%', height: '60%', width: '80%'}}>
        <b style={{color:'black', marginTop: '5%', fontSize: '180%'}}>Buy anything with crypto, 1.5% fee for individuals<br/> lowest on the net</b>
  <Form horizontal style={formStyle} onSubmit={this.handleSubmit}>
<FormGroup controlId="formHorizontalEmail">
 <Col componentClass={ControlLabel} sm={2}>
   <b style={{color:'black'}}>URL</b>
 </Col>
 <Col sm={4}>
    <FormControl value={this.state.urlValue} onChange={this.urlChange} type="url" placeholder="https://www.etsy.com/" style={inputSize}/>
    <Button style={{marginTop: '2%'}} bsStyle='primary' type="submit">create order</Button>
 </Col>
</FormGroup>
</Form>
</Panel>
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
return {
  message: state.auth.message,
 };
};

export default connect(mapStateToProps, {
 getScreenCap
})(enterUrl);
