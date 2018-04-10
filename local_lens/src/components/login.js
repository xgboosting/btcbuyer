import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar'
import { Link } from 'react-router-dom';
import { Form,
         FormGroup,
         Col,
         ControlLabel,
         FormControl,
         Checkbox,
         Button
 } from 'react-bootstrap';


class login extends Component {

  render () {
  return (
     <div>
     <Form horizontal onSubmit={this.handleSubmit}>
  <FormGroup controlId="formHorizontalEmail">
    <Col componentClass={ControlLabel} sm={2}>
      Email
    </Col>
    <Col sm={4}>
      <FormControl type="email" placeholder="Email" />
    </Col>
  </FormGroup>

  <FormGroup controlId="formHorizontalPassword">
    <Col componentClass={ControlLabel} sm={2}>
      Password
    </Col>
    <Col sm={2}>
      <FormControl type="password" placeholder="Password" />
    </Col>
  </FormGroup>
  <FormGroup>
    <Col smOffset={0} sm={10}>
      <Button type="submit">login</Button>
    </Col>
  </FormGroup>
</Form>
    </div>
  )
}
}


/*Hello.propTypes = {
 onClick: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired

}*/

export default login
