import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { userLoginreducer } from "./reducers/userReducer"
import { onlineReducer } from './reducers/onlineReducer'


const userLoginStorage = localStorage.getItem('social') ? JSON.parse(localStorage.getItem('social')): null
const reducer = combineReducers({
    userLogin:userLoginreducer,
    online:onlineReducer
})

const initialState = {
    userLogin:{userInfo:userLoginStorage},
    online:{friends:[]}
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store