import React, { Component } from 'react';
import { getAddresses, sendNewAddress, updateChangeMessage } from '../actions';
import { connect } from 'react-redux';
import Login from '../noRedirect/login';
import CreateAccount from '../noRedirect/createAccount';
import AddressForm from '../noRedirect/addressForm';
import { Button,
         Checkbox
 } from 'react-bootstrap';
 import hourglass from './../assets/hourglass.gif';

//name
//address
//apartment
//country
//zip
//additional info


 class makeOrder extends Component {

   constructor(props) {
   super(props);
   this.state = {nameValue: '', addressValue: '', apartmentValue: '', countryValue: '', zipValue: '', additionalValue: '', isDefaultValue: true};
   if (localStorage.getItem('token')) {
     this.props.getAddresses();
   }
   console.log(this.props.addresses);
 }


isDefaultChange() {
  console.log(this.state.isDefaultValue)
  if (this.state.isDefaultValue === true) {
  this.setState({isDefaultValue: false});
} else if (this.state.isDefaultValue === false) {
  this.setState({isDefaultValue: true});
}
}


  checked(bool) {
   if (bool === true) {
     return (
     <Checkbox inline readOnly checked>is default</Checkbox>
     )
   } return (
     <Button>make default</Button>
   )
  }

renderImage() {
  
  console.log(localStorage.getItem('screenshot_uuid'));
  if (localStorage.getItem('screenshot_url') !== null) {
    const imgUrl = `http://167.99.175.200/photos/${localStorage.getItem('screenshot_uuid')}.png`
    return (
      <img src={imgUrl} alt="loaded" />
      )
    } return (
      <img src={hourglass} alt="spinner" />
    )
  }

  render() {
     if (localStorage.getItem('token') === null) {
       return (
       <div>
         {this.renderImage()}
         <CreateAccount />
         <Login />
       </div>
     )
     }
     if (localStorage.getItem('token') !== null) {
       return (
       <div>
         {this.renderImage()}
         <AddressForm />
       </div>
     )
     }
   }
 }


const mapStateToProps = state => {
  console.log(state)
return {
  changeMessage: state.auth.changeMessage,
  addresses: state.auth.addresses,
  imageUrl: state.auth.orderImg
 };
};

export default connect(mapStateToProps, {
 getAddresses,
 sendNewAddress,
 updateChangeMessage
})(makeOrder);
