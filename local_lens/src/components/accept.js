import React, { Component } from 'react';
import { sendEmail } from '../actions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form,
         FormGroup,
         Col,
         ControlLabel,
         FormControl,
         Button,
         HelpBlock,
         Panel,
         ListGroupItem
 } from 'react-bootstrap';
 import telegram from './../assets/telegram.png'
 import reddit from './../assets/reddit.png'


const divStyle = {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center',
   heigt: '100%'
};

const accept = () => {

  return (
    <div>
     <a style={{margin: '2%'}} href="https://t.me/bitagora"><img src={telegram} alt="kabuto" /></a>
     <a style={{margin: '2%'}}  href="https://reddit.com/r/bitagora"><img src={reddit} alt="kabuto" /></a>

<Panel style={{marginLeft:'5%', marginRight: '5%'}}>
  <Panel.Heading>
<Panel.Title componentClass="h3">Accept bitcoin</Panel.Title>
</Panel.Heading>
<b style={{fontSize: '160%', color: 'black '}}>
<br />
To accept crypto currencies for a product simply paste the url of the product you would like to accept crypto for behind bitagora.co/redirect/
<br/>
for example lets say you are selling this item: <br/>
<a href='https://www.etsy.com/listing/583529698/bitcoin-logo-button-125-or-225-pinback?ref=hp_rv'>https://www.etsy.com/listing/583529698/bitcoin-logo-button-125-or-225-pinback?ref=hp_rv</a>
<br />
simply paste it behind my url like so: <br />
<a href='https://bitagora.co/redirect/https://www.etsy.com/listing/583529698/bitcoin-logo-button-125-or-225-pinback?ref=hp_rv'>https://bitagora.co/redirect/https://www.etsy.com/listing/583529698/bitcoin-logo-button-125-or-225-pinback?ref=hp_rv</a>
</b>
</Panel>
</div>
  )

}

export default accept;
