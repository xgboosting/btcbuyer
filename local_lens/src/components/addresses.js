import React, { Component } from 'react';
import { getAddresses, sendNewAddress, updateChangeMessage } from '../actions';
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
         Checkbox,
         Panel,
         ListGroupItem
 } from 'react-bootstrap';

//name
//address
//apartment
//country
//zip
//additional info


 class addresses extends Component {

   constructor(props) {
   super(props);
   this.state = {nameValue: '', addressValue: '', apartmentValue: '', countryValue: '', zipValue: '', additionalValue: '', isDefaultValue: true, phoneValue: ''};
   this.props.getAddresses();
   this.nameChange = this.nameChange.bind(this);
   this.addressChange = this.addressChange.bind(this);
   this.apartmentChange = this.apartmentChange.bind(this);
   this.countryChange = this.countryChange.bind(this);
   this.zipChange = this.zipChange.bind(this);
   this.additionalChange = this.additionalChange.bind(this);
   this.isDefaultChange = this.isDefaultChange.bind(this);
   this.phoneChange = this.phoneChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }


nameChange(event) {
    this.setState({nameValue: event.target.value});
  }

addressChange(event) {
    this.setState({addressValue: event.target.value});
  }

 apartmentChange(event) {
     this.setState({apartmentValue: event.target.value});
   }

countryChange(event) {
  this.setState({countryValue: event.target.value});
}

zipChange(event) {
  this.setState({zipValue: event.target.value});
}

additionalChange(event) {
  this.setState({additionalValue: event.target.value});
}


phoneChange(event) {
  this.setState({phoneValue: event.target.value});
}

isDefaultChange() {
  console.log(this.state.isDefaultValue)
  if (this.state.isDefaultValue === true) {
  this.setState({isDefaultValue: false});
} else if (this.state.isDefaultValue === false) {
  this.setState({isDefaultValue: true});
}
}

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.nameValue.length < 2) {
      this.props.updateChangeMessage('you need to enter a name');
    } else if (this.state.addressValue.length < 2) {
      this.props.updateChangeMessage('please enter a valid address');
    } else {
      this.setState({phoneValue: '', nameValue: '', addressValue: '', apartmentValue: '', countryValue: '', zipValue: '', additionalValue: '', isDefaultValue: true});
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

  checked(bool) {
   if (bool === true) {
     return (
     <Checkbox inline readOnly checked>is default</Checkbox>
     )
   } return (
     <Button>make default</Button>
   )
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
        <Panel style={{marginLeft: '5%',  marginRight: '5%'}}>
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
       {object.phoneNumber}</ListGroupItem>
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
   return (
    <div style={divStyle}>
    <Grid>
      <Row className="show-grid">
       {this.returnAddresses()}
      </Row>
    </Grid>
    <Panel style={{marginLeft: '5%',  marginRight: '5%'}}>
      <Panel.Heading>
    <Panel.Title componentClass="h3">Addresses</Panel.Title>
    </Panel.Heading>
      <br />

  <Form horizontal onSubmit={this.handleSubmit}>
    <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
  <FormGroup  >
    <Col componentClass={ControlLabel} sm={2}>
      <b style={{color:'black'}}>name</b>
    </Col>
    <Col sm={3}>
      <FormControl value={this.state.nameValue} onChange={this.nameChange} type="text" placeholder="john smith" />
    </Col>
  </FormGroup>
  </ListGroupItem>
<ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
   <FormGroup controlId="formHorizontalPassword" >
     <Col componentClass={ControlLabel} sm={2}>
       <b style={{color:'black'}}>address</b>
     </Col>
     <Col sm={2}>
       <FormControl value={this.state.addressValue} onChange={this.addressChange} componentClass="textarea" placeholder="1000 Wayne Manor         Gotham City, USA" />
     </Col>
   </FormGroup>
   </ListGroupItem>
   <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
   <FormGroup controlId="formHorizontalPassword1">
     <Col componentClass={ControlLabel} sm={2}>
      <b style={{color:'black'}}>apartment</b>
     </Col>
     <Col sm={3}>
       <FormControl value={this.state.apartmentValue} onChange={this.apartmentChange} type="text" placeholder="b5" />
     </Col>
   </FormGroup>
   </ListGroupItem>
   <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
   <FormGroup controlId="formHorizontalPassword1" >
     <Col componentClass={ControlLabel} sm={2}>
      <b style={{color:'black'}}>country</b>
     </Col>
     <Col sm={4}>
       <FormControl value={this.state.countryValue} onChange={this.countryChange} type="text" placeholder="country" />
     </Col>
   </FormGroup>
   </ListGroupItem>
   <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
   <FormGroup controlId="formHorizontalPassword1" >
     <Col componentClass={ControlLabel} sm={2}>
      <b style={{color:'black'}}>zip code</b>
     </Col>
     <Col sm={2}>
       <FormControl value={this.state.zipValue} onChange={this.zipChange} type="text" placeholder="zip code" />
     </Col>
   </FormGroup>
   </ListGroupItem>
   <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
   <FormGroup controlId="formHorizontalPassword1" >
     <Col componentClass={ControlLabel} sm={2}>
      <b style={{color:'black'}}>phone number</b>
     </Col>
     <Col sm={2}>
       <FormControl value={this.state.phoneValue} onChange={this.phoneChange} type="text" placeholder="+1-541-754-3010" />
     </Col>
   </FormGroup>
   </ListGroupItem>
   <ListGroupItem style={{marginLeft: '5%',  marginRight: '5%'}}>
   <FormGroup controlId="formHorizontalPassword1" >
     <Col componentClass={ControlLabel} sm={2}>
      <b style={{color:'black'}}>additional info</b>
     </Col>
     <Col sm={3}>
       <FormControl value={this.state.additionalValue} onChange={this.additionalChange} componentClass="textarea" placeholder="additional info" />
     </Col>
   </FormGroup>
   </ListGroupItem>
   <HelpBlock>{this.props.changeMessage}</HelpBlock>
   <FormGroup>
     <Col smOffset={0} sm={10}>
       <Button bsStyle='primary' type="submit">Save Address</Button>
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
    height: '100%',
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
 updateChangeMessage
})(addresses);
