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

const divStyle = {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center',
   heigt: '100%'
};


class contact extends Component {
  render () {
  return (
     <div style={divStyle} >
      <pre style={{whiteSpace: 'pre-wrap', margin: '5%'}}>-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v1

mQENBFrkvAcBCADz1IdfscG5f6b0nPldvU6Fau35bEl77B6CpwYRGf072PWgxpJp
5pnvQezQsbqTLU0jq3IGgfFFPD8qBr7K2sMv+IsCvhvyPcD4O9Fb6ppBgws3jF6P
fFtkL884zTNifB8wRanlc7usDn0Kb3Iw9A2/pJqVoj2iKbYnqsaof6UlK7aKzJYk
Y7w3pPjXVwzGh+gAF1H1dTsBcfYr1K6hn8s1foVrcjEZgqwXA2t7wLw7YcPDoeSF
RvEFJrKXxfibS3MFZNFFyaEDgs0ogM0AVO3nehRnwfQ8K5GnKKcz12m9IgQ6kYiy
G6LjywPof2Ddd6IyfuW18ncDsubysB+HOsGhABEBAAG0NGNvbm5lbGwgZ291Z2gg
KGJpdGFnb3JhLmNvKSA8Z29ubmVsbGNvdWdoQGdtYWlsLmNvbT6JAT4EEwECACgF
AlrkvAcCGwMFCQHhM4AGCwkIBwMCBhUIAgkKCwQWAgMBAh4BAheAAAoJENhZ9Xmg
eZ49wuAIAOlPcG4VYlmA64aDR93rK+UBQ9O8IrUZ3uKg1/7x5fhfKoZAc67cdIrU
+Q/B6z8dF+iL9GyZ6oRhI/OM7IFffJiogUHzn3Fzs1+zi8gv87xc9TtdHSekJkz4
BFoBwAMh15ao7sXgEPOjhQ2pVhL+nSoYpVzdPXAlLKF6LFqLQoWWz4YCNb/dNt7a
g+BdAgLnidX1HEdMIVK5zRB8mu0vpEdCHVOr9h9eATYz+B3qzd02D91XlaRNLpYu
DV+VvGp29EkbCm+dx5EnuF8gnmzTvOBNY8+MjMHXxzfS2iZBehmSntsn74TUkkrm
7zCrvmEaPDqPppeR5lIdHVs8grBCRgG5AQ0EWuS8BwEIAKSMbTbIhvJkh/o20C3X
8gWoU0paxhNpkEOf/8ZERQVjQwZfX5m6WkQ04EOoaiTw5OrWjqm0lMjODE+h45Ii
ZM6x6xfB+WflxLBStiVV4W6WVsZ5qgkcfNtxuqchW6TseYrjygwWA/nbCE322k0S
QlAVe/KjfQK8PkI0c1LDbRyt+FaE4PUqKE+S13QrrnYJKiNU/1jelxh2GdZV6H0K
JQv002ORDxEEUe/55gYdyccfTuOmG3yAZYnLAO3of9EfxvSFhAf2B3yBhHf7IYZf
F5Olg+wdJeJf9YbqhRmKsHGkhEFy2Uen3F8zW4w1BIXp2hd3h9Jjmv0a3b/YdgUd
jf0AEQEAAYkBJQQYAQIADwUCWuS8BwIbDAUJAeEzgAAKCRDYWfV5oHmePfRYB/9w
FliVS4ysie6IloW0KekZzv2sgibhl5qSMfc9Kj9qkDxuIM5yXknHVWp2yBIZsGx0
WGYZz7srT23IpRpjUwcG8HLIIZ3XQGwhPHsB25mrvUOsuJzNb38iXuz/hE/dz+Hg
KBDPIze9G/AzLsml84zVHrIB4oSiWqRU48KUKvheKqpzxBUUhNNw6e5LD76GHoVG
Pb32kKE8y6wEqoUM+RdtuxzBmc93XQibS8HfRykeDk6a8CRQTFWotKZ+bdxs8SI0
+Kc4J6z1JJVG/8MgQraMNHZSRw+mEn0eD08XwGm+4Maxj8dtHKdIM4BawLHzhIiX
8eS7lRXauMyxGvFVuo23
=l+Gg
-----END PGP PUBLIC KEY BLOCK-----
</pre>
<a style={{color: 'white'}} href='http://keyserver.ubuntu.com/pks/lookup?op=vindex&search=bitagora&fingerprint=on'>make sure it matches on the ubuntu key server</a>
    </div>
  )
}
}



const mapStateToProps = state => {
  console.log(state)
return {
  message: state.auth.message,
 };
};

export default connect(mapStateToProps, {
 sendEmail
})(contact);
