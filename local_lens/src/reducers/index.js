import { combineReducers } from 'redux';
import {
  LOADING,
  LOADING_FALSE,
  HELLO_WORLD,
  RESET,
  PHOTOS,
  SET_AUTHTOKEN,
  SET_GUEST,
  MESSAGE
} from './../actions';


let initialState = { message: '', photos: {}, loading: false,  token: 'notavalidtoken', guest: true }

const helloWorld = (state=initialState, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case MESSAGE:
      return Object.assign({}, state, { message: action.payload })
    //case RESET:
    	//return state = initialState
    case LOADING:
      return {...state, loading: true }
    case LOADING_FALSE:
      return {...state, loading: false }
    case PHOTOS:
      return {...state, photos: action.payload }
    case SET_AUTHTOKEN:
      console.log(state);
      return {...state, token: action.payload}
    case SET_GUEST:
      return {...state, guest: action.payload}
    //case MESSAGE:
    //   return {...state, message: action.payload}
    default:
      return state
  }
}

const helloReducer = combineReducers({
  auth: helloWorld
})

export default helloReducer
