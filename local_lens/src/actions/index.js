import axios from 'axios';
export const HELLO_WORLD = 'HELLO_WORLD';
export const RESET = 'RESET';
export const PHOTOS = 'PHOTOS';
export const LOADING_FALSE = 'LOADING_FALSE';
export const LOADING = 'LOADING';
export const SET_AUTHTOKEN = 'SET_AUTHTOKEN';
export const SET_GUEST= 'SET_GUEST';
export const MESSAGE = 'MESSAGE';
export const LOGIN_MESSAGE = 'LOGIN_MESSAGE';
export const RECOVER_PASSWORD = 'RECOVER_PASSWORD';
export const CHANGE_MESSAGE = 'CHANGE_MESSAGE';
export const UPDATE_ADDRESSES = 'UPDATE_ADDRESSES';
export const SET_ORDER_IMAGE = 'SET_ORDER_IMAGE';
export const UPDATE_ORDERS = 'UPDATE_ORDERS';
export const SEND_EMAIL = 'SEND_EMAIL';


//const BASE_URL = 'http://127.0.0.1:8000/'
const BASE_URL = 'https://bitagora.co/'


export const helloWorld = () => {
  return {
    type: HELLO_WORLD
  }
}

export const sendEmail = (theemail, thesubject, themessage) => {
  return (dispatch) => {
    const url = `${BASE_URL}api/contact/`;
    axios.post(url, {
       from: theemail,
       subject: thesubject,
       message: themessage
    }).then(function (response) {
      dispatch({type: MESSAGE, payload: 'success'});
    }).catch(function (error) {
      console.log(error);
      dispatch({type: MESSAGE, payload: 'something went wrong'});
    })
  }
}

export const getPaymentAddress = (theorderUUID) => {
  return (dispatch) => {
    //axios.defaults.withCredentials = false;
    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/get-address/`;
    axios.post(url, {
       orderUUID: theorderUUID
    }).then(function (response) {
      dispatch({type: UPDATE_ORDERS, payload: response.data});
    }).catch(function (error) {
      console.log(error);
      dispatch({type: CHANGE_MESSAGE, payload: 'something went wrong'});
    })
  }
}


export const sendMessage = (theorderUUID, themessage, theoption) => {
  return (dispatch) => {
    //axios.defaults.withCredentials = false;
    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/message/`;
    axios.post(url, {
       orderUUID: theorderUUID,
       content: themessage,
       option: theoption
    }).then(function (response) {
      dispatch({type: UPDATE_ORDERS, payload: response.data});
    }).catch(function (error) {
      console.log(error);
      dispatch({type: CHANGE_MESSAGE, payload: 'something went wrong'});
    })
  }
}

export const getOrders = (status) => {
  return (dispatch) => {
    //axios.defaults.withCredentials = false;
    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/get-orders/`;
    axios.post(url, {
      option: status
    }).then(function (response) {
      dispatch({type: UPDATE_ORDERS, payload: response.data});
    }).catch(function (error) {
      console.log(error);
    })
  }
}
export const sendOrderWithAddress = (
  thePrice,
  uuid,
  theUrl,
  theScreenshotUUID,
  quantityValue) => {
  return (dispatch) => {
    //axios.defaults.withCredentials = false;
    const localScreenshotUUID = localStorage.getItem('screenshot_uuid');
    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/orders/`;
    axios.post(url, {
      addressUUID: uuid,
      price: thePrice,
      url: theUrl,
      screenshotUUID: localScreenshotUUID,
      creatingOrder: true,
      quantity: quantityValue
    }).then(function (response) {
      dispatch({type: UPDATE_ADDRESSES, payload: response.data});
      dispatch({type: CHANGE_MESSAGE, payload: 'success'});
    }).catch(function (error) {
      console.log(error);
      dispatch({type: CHANGE_MESSAGE, payload: 'something went wrong'})
    })
  }
}

export const sendOrderNewAddress = (
  nameValue,
  apartmentValue,
  addressValue,
  countryValue,
  zipValue,
  additionalValue,
  phoneValue,
  thePrice,
  uuid,
  theUrl,
  theScreenshotUUID,
  quantityValue) => {

  return (dispatch) => {
    const token = localStorage.getItem('token');
    const localScreenshotUUID = localStorage.getItem('screenshot_uuid')
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/orders/`;
    axios.post(url, {
      name: nameValue,
      apartment: apartmentValue,
      address: addressValue,
      country: countryValue,
      zip: zipValue,
      additional: additionalValue,
      phone: phoneValue,
      addressUUID: uuid,
      price: thePrice,
      url: theUrl,
      screenshotUUID: localScreenshotUUID,
      creatingOrder: true,
      quantity: quantityValue
    }).then(function (response) {
      localStorage.setItem('orders', response.data);
      dispatch({type: UPDATE_ADDRESSES, payload: response.data})
      dispatch({type: CHANGE_MESSAGE, payload: 'success'})
    }).catch(function (error) {
      console.log(error);
      dispatch({type: CHANGE_MESSAGE, payload: 'something went wrong'})
    })
  }
}


export const getScreenCap = (theurl) => {
  return (dispatch) => {
    const url = `${BASE_URL}api/get-screencap/`;
    if (localStorage.getItem('token') !== null) {
          axios.post(url, {
            url: theurl,
            token: localStorage.getItem('token')
          }).then(function (response) {
            localStorage.setItem('screenshot_url', response.data.screenshot_url);
            localStorage.setItem('screenshot_uuid', response.data.screenshot_uuid);
            dispatch({ type: SET_ORDER_IMAGE, payload: response.data });
          }).catch(function (error) {
            console.log(error);
            dispatch({type: CHANGE_MESSAGE, payload: 'something went wrong'});
          })
  } else {
        axios.post(url, {
          url: theurl,
          token: 'notavalidtoken'
        }).then(function (response) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('screenshot_url', response.data.screenshot_url);
          localStorage.setItem('screenshot_uuid', response.data.screenshot_uuid);

          dispatch({ type: SET_ORDER_IMAGE, payload: response.data });

        }).catch(function (error) {
          console.log(error);
          dispatch({type: CHANGE_MESSAGE, payload: 'something went wrong'});
        })
  }

  }
}

export const getAddresses = () => {
  return (dispatch) => {

    //axios.defaults.withCredentials = false;
    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/addresses/`;
    axios.get(url).then(function (response) {
      dispatch({type: UPDATE_ADDRESSES, payload: response.data})
    }).catch(function (error) {
      console.log(error);
      dispatch({type: CHANGE_MESSAGE, payload: 'problem getting addresses'})
    })
  }
}

export const sendNewAddress = (nameValue, apartmentValue, addressValue, countryValue, zipValue, additionalValue, isDefaultValue, phoneValue) => {
  return (dispatch) => {
    //axios.defaults.withCredentials = false;
    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/addresses/`;
    axios.post(url, {
      name: nameValue,
      apartment: apartmentValue,
      address: addressValue,
      country: countryValue,
      zip: zipValue,
      additional: additionalValue,
      isDefault: isDefaultValue,
      phone: phoneValue
    }).then(function (response) {
      dispatch({type: UPDATE_ADDRESSES, payload: response.data});
      dispatch({type: CHANGE_MESSAGE, payload: 'address saved'});
    }).catch(function (error) {
      console.log(error);
      dispatch({type: CHANGE_MESSAGE, payload: 'something went wrong'});
    })
  }
}

export const sendChangeEmail = (thePassword, theNewEmail) => {
  return (dispatch) => {
    //axios.defaults.withCredentials = false;
    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = `Token ${token}`;
    const url = `${BASE_URL}api/change-data/`;
    axios.post(url, {
      password: thePassword,
      newEmail: theNewEmail
    }).then(function (response) {
      dispatch({type: CHANGE_MESSAGE, payload: 'email changed'})
    }).catch(function (error) {
      console.log(error);
      dispatch({type: CHANGE_MESSAGE, payload: 'your email or password were incorrect'})
    })
  }
}

export const sendChangePassword = (currentPassword, theNewPassword) => {
return (dispatch) => {
  //axios.defaults.withCredentials = false;
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = `Token ${token}`;
  const url = `${BASE_URL}api/change-password/`;
  axios.post(url, {
    password: currentPassword,
    newPassword: theNewPassword
  }).then(function (response) {
    dispatch({type: CHANGE_MESSAGE, payload: 'password changed'});
  }).catch(function (error) {
    console.log(error);
    dispatch({type: CHANGE_MESSAGE, payload: 'bad password'});
  })
}
}


export const recoverPassword = (theemail) => {
  return (dispatch) => {
    axios.defaults.withCredentials = false;
    const url = `${BASE_URL}api/recover-password/`;
    axios.post(url, {
      email: theemail
    }).then(function (response) {
      dispatch({type: RECOVER_PASSWORD, payload: 'email sent'});
    }).catch(function (error) {
      dispatch({type: RECOVER_PASSWORD, payload: 'we did not find that email please message the admins'});
    })
  }
}

export const reset = () => {
  return {
    type: RESET

  }
}

export const updateChangeMessage = (message) => {
  return {
    type: CHANGE_MESSAGE,
    payload: message
  }
}

export const updateMessage = (message) => {
  return {
    type: MESSAGE,
    payload: message
  }
}


export const loginUser = (theemail, thepassword) => {
   return (dispatch) => {
     axios.defaults.withCredentials = false;
     const url = `${BASE_URL}api/login/`;
     axios.post(url, {
       email: theemail,
       password: thepassword
     }).then(function (response) {
       localStorage.setItem('token', response.data.token);
       localStorage.setItem('isAuthed', true);
       dispatch({type: LOGIN_MESSAGE, payload: 'you are now logged in'})
     }).catch(function (error) {
       dispatch({type: LOGIN_MESSAGE, payload: 'there was a problem with your email or password'})
     })
   }
}

export const sendCreateAccount = (theemail, thepassword) => {
   return (dispatch) => {
     axios.defaults.withCredentials = false;
     const url = `${BASE_URL}api/create-user/`;
     axios.post(url, {
       email: theemail,
       password: thepassword
     }).then(function (response) {
       console.log(response.data);
       localStorage.setItem('token', response.data.token);
       localStorage.setItem('isAuthed', true);
       dispatch({type: MESSAGE, payload:'success! email sent'});
     }).catch(function (error) {
       console.log(error);
     })
   }
}

//UNUSED
export const getInitialState = (token) => {
   return (dispatch) => {
     if (token === 'notavalidtoken') {
     axios.defaults.withCredentials = false;
     const url = `${BASE_URL}api/create-user/`;
     axios.post(url, {
       guest: 'True'
     }).then(function (response) {
       dispatch({ type: SET_AUTHTOKEN, payload: response.data.token });
       dispatch({ type: SET_GUEST, payload: true });
       dispatch({ type: HELLO_WORLD });
     }).catch(function (error) {
       console.log(error);
     })
   };
   }
}
