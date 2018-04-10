import axios from 'axios';
export const HELLO_WORLD = 'HELLO_WORLD';
export const RESET = 'RESET';
export const PHOTOS = 'PHOTOS';
export const LOADING_FALSE = 'LOADING_FALSE';
export const LOADING = 'LOADING';
export const SET_AUTHTOKEN = 'SET_AUTHTOKEN';
export const SET_GUEST= 'SET_GUEST';
export const MESSAGE = 'MESSAGE';



export const helloWorld = () => {
  return {
    type: HELLO_WORLD
  }
}

export const reset = () => {
  console.log('reset')
  return {
    type: RESET
  }
}

export const updateMessage = (message) => {
  console.log('reset')
  return {
    type: MESSAGE,
    payload: message
  }
}


export const createAccount = (token) => {
   return (dispatch) => {
     console.log(token);
     axios.defaults.withCredentials = false;
     const url = `http://localhost:8000/api/create-user/`;
     axios.post(url, {

     }).then(function (response) {
       console.log(response.data);
       dispatch({ type: SET_AUTHTOKEN, payload: response.data.token });
       dispatch({ type: SET_GUEST, payload: true });
       dispatch({ type: HELLO_WORLD });
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
