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



export const helloWorld = () => {
  return {
    type: HELLO_WORLD
  }
}

export const sendChangePassword = (currentPassword, theNewPassword) => {
return (dispatch) => {
  //axios.defaults.withCredentials = false;
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = `Token ${token}`;
  const url = `http://localhost:8000/api/change-password/`;
  axios.post(url, {
    password: currentPassword,
    newPassword: theNewPassword
  }).then(function (response) {
    console.log(response.data);
    dispatch({type: CHANGE_MESSAGE, payload: 'password changed'})
  }).catch(function (error) {
    console.log(error);
    dispatch({type: CHANGE_MESSAGE, payload: 'hmmm something broke, message the admins please'})
  })
}
}


export const recoverPassword = (theemail) => {
  return (dispatch) => {
    console.log(theemail)
    axios.defaults.withCredentials = false;
    const url = `http://localhost:8000/api/recover-password/`;
    axios.post(url, {
      email: theemail
    }).then(function (response) {
      console.log(response.data);
      dispatch({type: RECOVER_PASSWORD, payload: 'email sent'})
    }).catch(function (error) {
      dispatch({type: RECOVER_PASSWORD, payload: 'we did not find that email please message the admins'})
    })
  }
}

export const reset = () => {
  console.log('reset');
  return {
    type: RESET

  }
}

export const updateChangeMessage = (message) => {
  console.log(message);
  return {
    type: CHANGE_MESSAGE,
    payload: message
  }
}

export const updateMessage = (message) => {
  console.log(message);
  return {
    type: MESSAGE,
    payload: message
  }
}

export const loginUser = (theemail, thepassword) => {
   return (dispatch) => {
     console.log(theemail)
     console.log(thepassword)
     axios.defaults.withCredentials = false;
     const url = `http://localhost:8000/api/login/`;
     axios.post(url, {
       email: theemail,
       password: thepassword
     }).then(function (response) {
       console.log(response.data);
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
     const url = `http://localhost:8000/api/create-user/`;
     axios.post(url, {
       email: theemail,
       password: thepassword
     }).then(function (response) {
       console.log(response.data);
       localStorage.setItem('token', response.data.token);
       localStorage.setItem('isAuthed', true);
       dispatch({type: MESSAGE, payload:'success! email sent'})
     }).catch(function (error) {
       console.log(error);
     })
   }
}


export const getInitialState = (token) => {
   return (dispatch) => {
     console.log(token);
     if (token == 'notavalidtoken') {
     axios.defaults.withCredentials = false;
     const url = `http://localhost:8000/api/create-user/`;
     axios.post(url, {
       guest: 'True'
     }).then(function (response) {
       console.log(response.data);
       dispatch({ type: SET_AUTHTOKEN, payload: response.data.token });
       dispatch({ type: SET_GUEST, payload: true });
       dispatch({ type: HELLO_WORLD });
     }).catch(function (error) {
       console.log(error);
     })
   };
   }
}

export const photosByNewest = (thePage) => {
  return (dispatch) => {
  dispatch({ type: LOADING });
  axios.defaults.withCredentials = true;
  const url = `https://locallensapp.com/api/photos-by-newest/`;
  axios.post(url, {
    page: thePage
  }).then(function (response) {
    console.log(response);
    dispatch({ type: PHOTOS, payload: response.data });
    dispatch({ type: LOADING_FALSE })
  });
  }
}
