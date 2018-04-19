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


class unpaidOrder extends Component {

  constructor(props) {
  super(props);
  this.props.getOrders('unpaid');
  this.state = {messageValue: ''};
  this.messageChange = this.messageChange.bind(this);
  this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
}

messageChange(event) {
  this.setState({messageValue: event.target.value});
}

handleMessageSubmit(event, orderUUID) {
  console.log(orderUUID)
  event.preventDefault();
  this.props.sendMessage(orderUUID, this.state.messageValue, 'unpaid');

}

getPayment(object) {
  console.log(object)
  this.props.getPaymentAddress(object.orderUUID);
}



renderMessages(object) {
  if (object.messages !== undefined) {
  const messToMap = object.messages
  return (
    <div style={{"borderWidth":"1px", 'borderRadius': '1%',  'borderStyle':'solid', margin: '10%', width:'140%', marginLeft: '5%'}}>

      <ListGroup>
        <Panel.Heading>
  <Panel.Title componentClass="h3">Messages</Panel.Title>
</Panel.Heading>

     {messToMap.map((message, i) =>
      <ListGroupItem key={i}><b>{message.byUser}:</b> <br />
       {message.content}<br />
       <b><Moment fromNow>{message.created}</Moment></b></ListGroupItem>

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
    </div>
  )
}
}

renderAddress(object) {
  console.log(object.btc);
  if (object.btc === undefined) {
  return(
  <Button onClick={() => this.getPayment(object)} bsStyle="primary" style={{marginLeft:'20%', marginBottom: '4%'}}>make payment</Button>
  )
}
return (
  <div>
    <Panel style={{marginLeft:'20%'}}>
      <ListGroup>
      <ListGroupItem><b> please send a payment to one of the addresses below <br />expires <Moment fromNow>{object.expires}</Moment><br /></b></ListGroupItem>
      <ListGroupItem><b>confirmations needed:<br />ltc: 2, btc: 1, btc cash:1, eth: 8</b></ListGroupItem>
       <ListGroupItem><span><b>{object.btc} </b> </span></ListGroupItem>
       <ListGroupItem><span><b>{object.eth} </b> </span></ListGroupItem>
       <ListGroupItem><span><b>{object.ltc} </b> </span></ListGroupItem>
       <ListGroupItem><span><b>{object.cash} </b> </span></ListGroupItem>
      </ListGroup>
     </Panel>
  </div>
)

}

renderImage(object) {
  const imgURL = `http://167.99.175.200/photos/${object.screenshotUUID}.png`
  return (
    <img style={{width: '250px', height: '250px', marginLeft: '40%'}} src={imgURL} />
  )

}

renderOrders () {

  if (this.props.orders.objects !== undefined) {
  const ordersToMap = this.props.orders.objects
  if (this.props.orders.objects.length === 0 && ) {
    return (
    <p><b>you have no unpaid orders</b></p>
  )
  }
  return (
    <div style={{ marginTop: '5%', marginBottom: '3%', width:'100%', flex: 1}}>

      {ordersToMap.map((object, i) =>
       <div key={i} style={{"borderWidth":"1px", 'borderRadius': '1%',  'borderStyle':'solid', margin: '10%'}}>
         <b><Moment fromNow>{object.orderCreated}</Moment></b>

          <Media>
              <Media.Left>
                {this.renderAddress(object)}
                <Panel style={{marginLeft:'20%'}}>
                  <ListGroup>
                   <ListGroupItem><span><b>name: </b> {object.name} </span></ListGroupItem>
                   <ListGroupItem><span><b>Address: </b> {object.address}</span></ListGroupItem>
                   <ListGroupItem> <span><b>Apartment: </b>{object.apartment}</span></ListGroupItem>
                   <ListGroupItem><span><b>country: </b>{object.country}</span></ListGroupItem>
                   <ListGroupItem><span><b>zip code: </b>{object.zipCode}</span></ListGroupItem>
                   <ListGroupItem><span><b>price: {object.price} </b></span></ListGroupItem>
                   <ListGroupItem><span><b>url: </b>{object.url}</span></ListGroupItem>
                   <ListGroupItem><span><b>additional info: </b>{object.additional}</span></ListGroupItem>
                  </ListGroup>
                 </Panel>

              </Media.Left>
               <Media.Right>
                 {this.renderImage(object)}
                 {this.renderMessages(object)}

               </Media.Right>
            </Media>

       </div>
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
  console.log(state)
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
})(unpaidOrder);
