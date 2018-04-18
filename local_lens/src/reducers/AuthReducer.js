import {
  LOADING,
  LOADING_FALSE,
  PHOTOS,
  SET_AUTHTOKEN,
  SET_GUEST,
  MESSAGE,
  LOGIN_MESSAGE,
  RECOVER_PASSWORD,
  CHANGE_MESSAGE,
  UPDATE_ADDRESSES,
  SET_ORDER_IMAGE,
  UPDATE_ORDERS
} from './../actions';


let initialState = { message: '', photos: {}, loading: false,  token: 'notavalidtoken', guest: true, addresses: {}, orderImg: '', orders: {} }

export default ( state = initialState, action) => {
  switch (action.type) {
    case MESSAGE:
      return Object.assign({}, state, { message: action.payload })
    case LOADING:
      return {...state, loading: true }
    case LOADING_FALSE:
      return {...state, loading: false }
    case PHOTOS:
      return {...state, photos: action.payload }
    case SET_AUTHTOKEN:
      return {...state, token: action.payload}
    case SET_GUEST:
      return {...state, guest: action.payload}
    case LOGIN_MESSAGE:
      return Object.assign({}, state, { loginMessage: action.payload })
    case RECOVER_PASSWORD:
       return Object.assign({}, state, { recoverMessage: action.payload })
    case CHANGE_MESSAGE:
       return Object.assign({}, state, { changeMessage: action.payload })
    case UPDATE_ADDRESSES:
        return Object.assign({}, state, { addresses: action.payload })
    case SET_ORDER_IMAGE:
        console.log(action.payload)
        return Object.assign({}, state, { orderImg: action.payload.screenshot_url })
    case UPDATE_ORDERS:
            return Object.assign({}, state, { orders: action.payload })
    default:
      return state
  }
}
