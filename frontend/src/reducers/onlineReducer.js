import {ONLINE_FRIEND_REQUEST, ONLINE_FRIEND_SUCCESS , ONLINE_FRIEND_FAIL } from "../constants/authConstants";


export const onlineReducer = (state={},action) => {
    switch(action.type){
        case ONLINE_FRIEND_REQUEST :
            return {loading:true}

        case ONLINE_FRIEND_SUCCESS : 
            return {loading:false,friends:action.payload}

        case ONLINE_FRIEND_FAIL :
            return {loading:false,error:action.payload}

        default : return state
    }
}