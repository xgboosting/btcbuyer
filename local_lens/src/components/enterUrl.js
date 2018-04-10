import React from 'react';
import PropTypes from 'prop-types';
import FAQ from './FAQ';
import login from './login';
import NavBar from './NavBar';
import createAccount from './createAccount';
import Showtext from './Showtext';
import ReactRevealText from 'react-reveal-text';
import { Form,
         FormGroup,
         Col,
         ControlLabel,
         FormControl,
         Checkbox,
         Button
 } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const isMobile = window.innerWidth <= 500;

const enterUrl = () => {
  if (isMobile) {
    return (
      <div>
<Form horizontal>
<FormGroup controlId="formHorizontalEmail">
<Col componentClass={ControlLabel} sm={1}>
 URL
</Col>
<Col sm={4}>
 <FormControl type="email" placeholder="Email" />
</Col>
</FormGroup>
</Form>
<Showtext />
</div>
    )
  }
  return (
    <div>
  <Form horizontal>
<FormGroup controlId="formHorizontalEmail">
 <Col componentClass={ControlLabel} sm={2}>
   URL
 </Col>
 <Col sm={4}>
   <FormControl type="url" placeholder="http://www.example.com/" />
 </Col>
</FormGroup>
</Form>
<Showtext />
  </div>

  )
}

/*Hello.propTypes = {
 onClick: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired

}*/

export default enterUrl
