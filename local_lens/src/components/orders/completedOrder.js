import React, { Component } from 'react';
import Moment from 'react-moment';
import { getOrders, sendMessage } from '../../actions';
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


class completedOrder extends Component {

  constructor(props) {
  super(props);
  this.props.getOrders('completed');
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
  this.props.sendMessage(orderUUID, this.state.messageValue, 'completed');

}

renderMessages(object) {
  if (object.messages !== undefined) {
  const messToMap = object.messages
  return (
    <div style={{"borderWidth":"1px", 'borderRadius': '1%',  'borderStyle':'solid', margin: '10%', width:'140%', marginLeft: '50%'}}>

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



renderOrders () {

  if (this.props.orders.objects !== undefined) {
  const ordersToMap = this.props.orders.objects
  return (
    <div style={{ marginTop: '5%', marginBottom: '3%', width:'80%', flex: 1}}>

      {ordersToMap.map((object, i) =>
       <div key={i} style={{"borderWidth":"1px", 'borderRadius': '1%',  'borderStyle':'solid', margin: '10%'}}>
         <b><Moment fromNow>{object.orderCreated}</Moment></b>

          <Media>
              <Media.Left>
                <ButtonToolbar style={{marginLeft:'20%', marginBottom: '4%'}}>
                  <DropdownButton
                    bsStyle="primary"
                bsSize="small"
                title="make payment"
                id="dropdown-size-medium"
              >
                 <MenuItem onSelect={(e) => console.log('btc')} eventKey="1">BTC</MenuItem>
                 <MenuItem  onSelect={(e) => console.log('eth')} eventKey="2">ETH</MenuItem>
                 <MenuItem onSelect={(e) => console.log('ltc')} eventKey="3">LTC</MenuItem>
                 <MenuItem onSelect={(e) => console.log('cash')} eventKey="4">BTC cash</MenuItem>
               </DropdownButton>
               </ButtonToolbar>
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
                 <img style={{marginLeft: '40%'}} src="http://via.placeholder.com/250x250" />
                 {this.renderMessages(object)}

               </Media.Right>
            </Media>

       </div>
      )}

    </div>

)
}
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
 sendMessage
})(completedOrder);
