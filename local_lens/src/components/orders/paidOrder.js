import React, { Component } from 'react';
import Moment from 'react-moment';
import { getOrders, sendMessage, getPaymentAddress } from '../../actions';
import { connect } from 'react-redux';
import { Form,
         FormGroup,
         Col,
         FormControl,
         Button,
         ListGroup,
         ListGroupItem,
         Panel,
         Media,
         DropdownButton,
         MenuItem,
         ButtonToolbar
 } from 'react-bootstrap';


class paidOrder extends Component {

  constructor(props) {
  super(props);
  this.props.getOrders('paid');
  this.state = {messageValue: ''};
  this.messageChange = this.messageChange.bind(this);
  this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
}

messageChange(event) {
  this.setState({messageValue: event.target.value});
}

handleMessageSubmit(event, orderUUID) {

  event.preventDefault();
  this.setState({messageValue: ''})
  this.props.sendMessage(orderUUID, this.state.messageValue, 'paid');

}

getPayment(object) {

  this.props.getPaymentAddress(object.orderUUID);
}



renderMessages(object) {
  if (object.messages !== undefined) {
  const messToMap = object.messages
  return (
    <Panel style={{width: '50%', marginLeft: '5%'}}>

      <ListGroup>
        <Panel.Heading>
  <Panel.Title style={{color:'black'}} componentClass="h3">Message the admins<br />response within 24 hours</Panel.Title>
</Panel.Heading>

     {messToMap.map((message, i) =>
      <ListGroupItem key={i}><b style={{color:'black'}}>{message.byUser}:</b> <br />
       <b style={{color:'black'}}>{message.content}</b><br />
       <b style={{color:'black'}}><Moment fromNow>{message.created}</Moment></b></ListGroupItem>

     )}
     </ListGroup>
     <Form horizontal onSubmit={(event) => this.handleMessageSubmit(event, object.orderUUID)} style={{marginLeft: '2%'}}>
       <FormGroup controlId="formHorizontalPassword1" >
         <Col sm={10}>
           <FormControl value={this.state.messageValue} onChange={this.messageChange} componentClass="textarea" placeholder="message" />
         </Col>
       </FormGroup>
       <FormGroup>
         <Col smOffset={0} sm={10}>
           <Button bsStyle="primary" type="submit">send message</Button>
         </Col>
       </FormGroup>

     </Form>
   </Panel>
  )
}
}

renderAddress(object) {

  if (object.btc === undefined) {
  return(
  <Button onClick={() => this.getPayment(object)} bsStyle="primary" style={{marginRight:'5%', marginBottom: '4%'}}>make payment</Button>
  )
}
return (

    <Panel style={{marginLeft:'20%', width: '50%'}}>
      <Panel.Heading>
    <Panel.Title style={{color:'black'}} componentClass="h3">please send a payment to one of the addresses below <br />expires <Moment fromNow>{object.expires}</Moment></Panel.Title>
    </Panel.Heading>
    <br />
      <ListGroupItem><b style={{color:'black'}}>confirmations needed:<br />ltc: 2, btc: 1, btc cash:1, eth: 8</b></ListGroupItem>
       <ListGroupItem><span><b style={{color:'black'}}>{object.btc} </b> </span></ListGroupItem>
       <ListGroupItem><span><b style={{color:'black'}}>{object.eth} </b> </span></ListGroupItem>
       <ListGroupItem><span><b style={{color:'black'}}>{object.ltc} </b> </span></ListGroupItem>
       <ListGroupItem><span><b style={{color:'black'}}>{object.cash} </b> </span></ListGroupItem>
     </Panel>

)

}

renderImage(object) {
  const imgURL = `https://bitagora.co/photos/${object.screenshotUUID}.png`
  return (
    <img style={{width: '250px', height: '250px', marginLeft: '5%'}} src={imgURL} />
  )

}

renderShippingAddress(object) {
  return (
    <Panel style={{marginLeft:'20%', width: '50%'}}>
      <Panel.Heading>
    <Panel.Title componentClass="h3">shipping to</Panel.Title>
    </Panel.Heading>
    <br />
      <ListGroupItem><span><b style={{color:'black'}}>name: {object.name}</b>  </span></ListGroupItem>
      <ListGroupItem><span><b style={{color:'black'}}>Address: {object.address</b> }</span></ListGroupItem>
      <ListGroupItem> <span><b style={{color:'black'}}>Apartment: {object.apartment}</b> </span></ListGroupItem>
      <ListGroupItem><span><b style={{color:'black'}}>country: {object.country}</b> </span></ListGroupItem>
      <ListGroupItem><span><b style={{color:'black'}}>zip code: {object.zipCode}</b> </span></ListGroupItem>
      <ListGroupItem><span><b style={{color:'black'}}>price: {object.price}</b> </b></span></ListGroupItem>
      <ListGroupItem><span><b style={{color:'black'}}>url: {object.url}</b> </span></ListGroupItem>
      <ListGroupItem><span><b style={{color:'black'}}>additional info: {object.additional}</b> </span></ListGroupItem>
     </Panel>
  )
}

renderOrders () {

  if (this.props.orders.objects !== undefined) {
  const ordersToMap = this.props.orders.objects
  if (this.props.orders.objects.length === 0) {
    return (
    <p><b>you have no paid orders</b></p>
  )
  }
  return (
    <div style={{ marginTop: '5%', marginBottom: '3%', width:'100%', flex: 1}}>

      {ordersToMap.map((object, i) =>
       <Panel key={i} style={{marginLeft:'5%', marginRight:'5%'}}>
         <Panel.Heading>
       <Panel.Title componentClass="h3">paid Order created  <b><Moment fromNow>{object.orderCreated}</Moment></b></Panel.Title>
       </Panel.Heading>
       <br />
                {this.renderImage(object)}
                {this.renderMessages(object)}
                {this.renderShippingAddress(object)}
       </Panel>
      )}

    </div>

)
} return (
  <p><b>you have no paid orders</b></p>
)
}

  render () {
  return (
     <div>
     {this.renderOrders()}
    </div>
  )
}
}


const mapStateToProps = state => {

return {
  changeMessage: state.auth.changeMessage,
  addresses: state.auth.addresses,
  orders: state.auth.orders
 };
};

export default connect(mapStateToProps, {
 getOrders,
 sendMessage,
 getPaymentAddress
})(paidOrder);
