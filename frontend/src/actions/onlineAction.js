import { ONLINE_FRIEND_REQUEST, ONLINE_FRIEND_SUCCESS } from "../constants/authConstants"

export const onlineAction = (onlineUsers) => (dispatch) => {
    console.log(onlineUsers)
        dispatch({type:ONLINE_FRIEND_REQUEST})
        dispatch({type:ONLINE_FRIEND_SUCCESS,payload:onlineUsers})
}