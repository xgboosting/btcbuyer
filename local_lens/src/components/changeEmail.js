import React, { Component } from 'react';
import { sendChangeEmail } from '../actions';
import { connect } from 'react-redux';
import { Form,
         FormGroup,
         Col,
         ControlLabel,
         FormControl,
         Button,
         HelpBlock
 } from 'react-bootstrap';


class changeEmail extends Component {

  constructor(props) {
  super(props);
  this.state = {passwordValue: '', newEmailValue: ''};
  this.passwordChange = this.passwordChange.bind(this);
  this.newEmailChange = this.newEmailChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}



newEmailChange(event) {
   this.setState({newEmailValue: event.target.value});
 }

passwordChange(event) {
    this.setState({passwordValue: event.target.value});
  }


 handleSubmit(event) {
   event.preventDefault();
   this.props.sendChangeEmail(this.state.passwordValue, this.state.newEmailValue);
 }



  render () {
  return (

 <Form horizontal onSubmit={this.handleSubmit}>
  <FormGroup controlId="formHorizontalPassword">
    <Col componentClass={ControlLabel} sm={2}>
      Password
    </Col>
    <Col sm={2}>
      <FormControl value={this.state.passwordValue} onChange={this.passwordChange} type="password" placeholder="password" />
    </Col>
  </FormGroup>
  <FormGroup controlId="formHorizontalEmail">
    <Col componentClass={ControlLabel} sm={2}>
      New Email
    </Col>
    <Col sm={4}>
      <FormControl value={this.state.newEmailValue} onChange={this.newEmailChange} type="email" placeholder="Email@example.com" />
    </Col>
  </FormGroup>
  <HelpBlock>{this.props.changeMessage}</HelpBlock>
  <FormGroup>
    <Col smOffset={0} sm={10}>
      <Button type="submit">Change Email</Button>
    </Col>
  </FormGroup>
</Form>

  )
}
}


const mapStateToProps = state => {
  console.log(state)
return {
  changeMessage: state.auth.changeMessage,
 };
};

export default connect(mapStateToProps, {
 sendChangeEmail
})(changeEmail);
