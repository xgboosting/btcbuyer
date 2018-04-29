import React, { Component } from 'react';
import { getAddresses, sendNewAddress, updateChangeMessage, sendOrderNewAddress, sendOrderWithAddress } from '../actions';
import { connect } from 'react-redux';
import { Form,
         FormGroup,
         Col,
         ControlLabel,
         FormControl,
         Button,
         HelpBlock,
         Grid,
         Row,
         Panel,
         ListGroupItem
 } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

 class addressForm extends Component {

   constructor(props) {
   super(props);

   const myuuid = localStorage.getItem('screenshot_uuid');
   const myurl = localStorage.getItem('screenshot_url');


   this.state = {
    nameValue: '',
   addressValue: '',
   apartmentValue: '',
   phoneValue: '',
   countryValue: '',
   zipValue: '',
   additionalValue: '',
   isDefaultValue: true,
   urlValue: myurl,
   screenshotUUID: myuuid,
   productNameValue: '',
   priceValue: '',
   additionalOrderValue: '',
   uuid: '',
   quantityValue: ''
  };
   this.props.getAddresses();
   this.nameChange = this.nameChange.bind(this);
   this.addressChange = this.addressChange.bind(this);
   this.apartmentChange = this.apartmentChange.bind(this);
   this.countryChange = this.countryChange.bind(this);
   this.zipChange = this.zipChange.bind(this);
   this.additionalChange = this.additionalChange.bind(this);
   this.useAddress = this.useAddress.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);

   this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
   this.urlChange = this.urlChange.bind(this);
   this.productNameChange = this.productNameChange.bind(this);
   this.priceChange = this.priceChange.bind(this);
   this.additionalOrderChange = this.additionalOrderChange.bind(this);
   this.phoneChange = this.phoneChange.bind(this);
   this.quantityChange = this.quantityChange.bind(this);
 }


nameChange(event) {
    this.setState({nameValue: event.target.value, uuid: ''});
  }

addressChange(event) {
    this.setState({addressValue: event.target.value, uuid: ''});
  }

 apartmentChange(event) {
     this.setState({apartmentValue: event.target.value, uuid: ''});
   }

countryChange(event) {
  this.setState({countryValue: event.target.value, uuid: '' });
}

zipChange(event) {
  this.setState({zipValue: event.target.value, uuid: '' });
}

additionalChange(event) {
  this.setState({additionalValue: event.target.value, uuid: '' });
}

quantityChange(event) {
     this.setState({quantityValue: event.target.value});
   }

urlChange(event) {
  this.setState({ urlValue: event.target.value });
}


productNameChange(event) {
  this.setState({ productNameValue: event.target.value });
}


priceChange(event) {
  this.setState({ priceValue: event.target.value });
}


additionalOrderChange(event) {
  this.setState({ additionalOrderValue: event.target.value });
}

phoneChange(event) {
  this.setState({ phoneValue: event.target.value });
}

handleSubmitOrder(event) {
  event.preventDefault();
  console.log('does this fire')
  if (this.state.uuid !== '') {
    console.log('address has uuid')
    this.props.sendOrderWithAddress(this.state.priceValue, this.state.uuid, this.state.urlValue, this.state.screenshotUUID, this.state.quantityValue);
  } else {
  console.log('address no uuid')
  this.props.sendOrderNewAddress(
  this.state.nameValue,
  this.state.apartmentValue,
  this.state.addressValue,
  this.state.countryValue,
  this.state.zipValue,
  this.state.additionalValue,
  this.state.phoneValue,
  this.state.priceValue,
  this.state.uuid,
  this.state.urlValue,
  this.state.screenshotUUID,
  this.state.quantityValue);
}
}

handleSubmit(event) {
    event.preventDefault();
    if (this.state.nameValue.length < 2) {
      this.props.updateChangeMessage('you need to enter a name');
    } else if (this.state.addressValue.length < 2) {
      this.props.updateChangeMessage('please enter a valid address');
    } else {
      this.setState({uuid: '', nameValue: '', addressValue: '', apartmentValue: '', countryValue: '', zipValue: '', additionalValue: '', isDefaultValue: true});
      if (this.state.isDefaultValue === true) {
           this.props.sendNewAddress(
           this.state.nameValue,
           this.state.apartmentValue,
           this.state.addressValue,
           this.state.countryValue,
           this.state.zipValue,
           this.state.additionalValue,
           false,
           this.state.phoneValue);
    } else if (this.state.isDefaultValue === false) {
      this.props.sendNewAddress(
        this.state.nameValue,
        this.state.apartmentValue,
        this.state.addressValue,
        this.state.countryValue,
        this.state.zipValue,
        this.state.additionalValue,
        true,
        this.state.phoneValue);
    }
    }
  }

useAddress(object, event) {
    this.setState({uuid: object.uuid, nameValue: object.name, addressValue: object.address, apartmentValue: object.apartment, countryValue: object.country, zipValue: object.zipCode, additionalValue: object.additional});
}

 returnAddresses() {

   if (this.props.addresses.objects !== undefined) {
     const addressesToMap = this.props.addresses.objects
   return (
     <Grid style={{ marginTop: '1%', marginBottom: '1%'}}>
       <Row className="show-grid">
       {addressesToMap.map((object, i) =>
         <div style={{colStyle}}>
           <Col sm={6} md={3} key={i} >
        <Panel style={{marginLeft: '5%',  marginRight: '5%', color:'black'}}>
          <Panel.Heading>
        <Panel.Title componentClass="h3">Address</Panel.Title>
        </Panel.Heading>
         <br />

          <br />
          <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%', color:'black'}}><b style={{color:'black'}}>name: </b>
          {object.name}</ListGroupItem>
        <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%', color:'black'}}><b style={{color:'black'}}>address: </b>
          {object.address} </ListGroupItem>
        <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%', color:'black'}}><b style={{color:'black'}}>apartment: </b>
          {object.apartment}</ListGroupItem>
        <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%', color:'black'}}><b style={{color:'black'}}>country: </b>
          {object.country}</ListGroupItem>
        <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%', color:'black'}}><b style={{color:'black'}}>zip: </b>
           {object.zipCode}</ListGroupItem>
         <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%', color:'black'}}><b style={{color:'black'}}>additional info: </b>
         {object.additional}</ListGroupItem>
       <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%', color:'black'}}><b style={{color:'black'}}>phone: </b>
       {object.phoneNumber}</ListGroupItem> <br />
     <Button style={{"marginBottom": '2%'}} onClick={() => this.useAddress(object)}>use this address</Button>
          <br />

        </Panel>
      </Col>
        </div>
       )}
       </Row>
     </Grid>


 )
}
 }


   render () {
     console.log(this.props)
     if (this.props.changeMessage === 'success') {
       return (
         <div>
           <Redirect to="/unpaid-orders"/>
         </div>
       )
     }
   return (
    <div style={divStyle}>

    <Grid>
      <Row className="show-grid">
       {this.returnAddresses()}
      </Row>
    </Grid>
    <Panel style={{marginLeft: '5%',  marginRight: '5%'}}>
      <Panel.Heading>
    <Panel.Title componentClass="h3">Create Order <br />if your order can be delivered digitally don't worry about all the inputs<br />
    if you feel inclined to encrypt your info please head over to my <a href='/contact'>contact page</a> to obtain a copy of my public key<br />
  if you're encrypting your info just put it all in the address field<br />
  note: all of the fields do not need to be filled out just make sure I have enough info to get the item to you.
    </Panel.Title>
    </Panel.Heading>
    <br />
  <Form horizontal onSubmit={this.handleSubmitOrder}>
    <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
  <FormGroup style={{ 'marginTop': '2%'}} >
    <Col componentClass={ControlLabel} sm={2}>
      name
    </Col>
    <Col sm={3}>
      <FormControl value={this.state.nameValue} onChange={this.nameChange} type="text" placeholder="john smith" />
    </Col>
  </FormGroup>
  </ListGroupItem>
<ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
   <FormGroup controlId="formHorizontalPassword" >
     <Col componentClass={ControlLabel} sm={2}>
       address
     </Col>
     <Col sm={2}>
       <FormControl value={this.state.addressValue} onChange={this.addressChange} componentClass="textarea" placeholder="1000 Wayne Manor         Gotham City, USA" />
     </Col>
   </FormGroup>
   </ListGroupItem>
   <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
   <FormGroup controlId="formHorizontalPassword12">
     <Col componentClass={ControlLabel} sm={2}>
      apartment
     </Col>
     <Col sm={3}>
       <FormControl value={this.state.apartmentValue} onChange={this.apartmentChange} type="text" placeholder="b5" />
     </Col>
   </FormGroup>
   </ListGroupItem>
   <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
   <FormGroup controlId="formHorizontalPassword12" >
     <Col componentClass={ControlLabel} sm={2}>
      country
     </Col>
     <Col sm={4}>
       <FormControl value={this.state.countryValue} onChange={this.countryChange} type="text" placeholder="country" />
     </Col>
   </FormGroup>
   </ListGroupItem>
   <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
   <FormGroup controlId="formHorizontalPassword12" >
     <Col componentClass={ControlLabel} sm={2}>
      zip code
     </Col>
     <Col sm={2}>
       <FormControl value={this.state.zipValue} onChange={this.zipChange} type="text" placeholder="zip code" />
     </Col>
   </FormGroup>
   </ListGroupItem>
   <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
   <FormGroup controlId="formHorizontalPassword1" >
     <Col componentClass={ControlLabel} sm={2}>
      phone number
     </Col>
     <Col sm={2}>
       <FormControl value={this.state.phoneValue} onChange={this.phoneChange} type="text" placeholder="+1-541-754-3010" />
     </Col>
   </FormGroup>
   </ListGroupItem>
   <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
   <FormGroup controlId="formHorizontalPassword12" >
     <Col componentClass={ControlLabel} sm={2}>
      additional info
     </Col>
     <Col sm={3}>
       <FormControl value={this.state.additionalValue} onChange={this.additionalChange} componentClass="textarea" placeholder="additional info" />
     </Col>
   </FormGroup>
   </ListGroupItem>
<ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>

 <FormGroup style={{ 'marginTop': '2%'}} >
   <Col componentClass={ControlLabel} sm={2}>
     url
   </Col>
   <Col sm={4}>
     <FormControl value={this.state.urlValue} onChange={this.urlChange} type="text" placeholder="http://example.com/product" />
   </Col>
 </FormGroup>
 </ListGroupItem>
<ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
  <FormGroup controlId="formHorizontalPassword" >
    <Col componentClass={ControlLabel} sm={2}>
      product name
    </Col>
    <Col sm={4}>
      <FormControl value={this.state.productNameValue} onChange={this.productNameChange} type="text" placeholder="the name of the product" />
    </Col>
  </FormGroup>
  </ListGroupItem>
  <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
  <FormGroup controlId="formHorizontalPassword12">
    <Col componentClass={ControlLabel} sm={2}>
     quantity
    </Col>
    <Col sm={3}>
      <FormControl value={this.state.quantityValue} onChange={this.quantityChange} type="number" placeholder="1" />
    </Col>
  </FormGroup>
  </ListGroupItem>
  <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
  <FormGroup controlId="formHorizontalPassword12" >
    <Col componentClass={ControlLabel} sm={2}>
     price total (USD) include shipping!
    </Col>
    <Col sm={4}>
      <FormControl value={this.state.priceValue} onChange={this.priceChange} type="number" placeholder="10.00" />
    </Col>
  </FormGroup>
  </ListGroupItem>
  <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
  <FormGroup controlId="formHorizontalPassword12" >
    <Col componentClass={ControlLabel} sm={2}>
     additional info
    </Col>
    <Col sm={8}>
      <FormControl value={this.state.additionalOrderValue} onChange={this.additionalOrderChange} componentClass="textarea" placeholder="this is where you should enter any information about color, size, and any other options" />
    </Col>
  </FormGroup>
</ListGroupItem>
  <HelpBlock>{this.props.changeMessage}</HelpBlock>
  <FormGroup>
    <Col smOffset={0} sm={10}>
      <Button bsStyle='primary' type="submit">continue to payment</Button>
    </Col>
  </FormGroup>

</Form>
</Panel>
 </div>
   )
 }
 }

 const divStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: '5%',
    position: 'fixed',
    overflow: 'auto'
 };

 const colStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 0.5
 };

const mapStateToProps = state => {
  console.log(state)
return {
  changeMessage: state.auth.changeMessage,
  addresses: state.auth.addresses
 };
};

export default connect(mapStateToProps, {
 getAddresses,
 sendNewAddress,
 updateChangeMessage,
 sendOrderNewAddress,
 sendOrderWithAddress
})(addressForm);
