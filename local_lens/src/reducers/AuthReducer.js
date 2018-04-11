import {
  LOADING,
  LOADING_FALSE,
  HELLO_WORLD,
  RESET,
  PHOTOS,
  SET_AUTHTOKEN,
  SET_GUEST,
  MESSAGE,
  LOGIN_MESSAGE,
  RECOVER_PASSWORD,
  CHANGE_MESSAGE
} from './../actions';


let initialState = { message: '', photos: {}, loading: false,  token: 'notavalidtoken', guest: true, message: '' }

export default ( state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    case MESSAGE:
      console.log(action.payload);
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
    case LOGIN_MESSAGE:
       console.log(action.payload)
      return Object.assign({}, state, { loginMessage: action.payload })
    case RECOVER_PASSWORD:
       return Object.assign({}, state, { recoverMessage: action.payload })
    case CHANGE_MESSAGE:
       return Object.assign({}, state, { changeMessage: action.payload })
    default:
      return state
  }
}
