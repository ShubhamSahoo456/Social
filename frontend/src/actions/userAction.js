import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/authConstants"
import axios from 'axios';



export const userLoginAction = (email,password,navigate) => async(dispatch) => {
    try{
        dispatch({type:USER_LOGIN_REQUEST})
        const {data} = await axios.post("http://localhost:8000/api/v1/login",{email,password})
        localStorage.setItem('social',JSON.stringify(data))
        if(data._id){
            dispatch({type:USER_LOGIN_SUCCESS,payload:data})
            navigate("/")
        }
    }catch(err){
        console.log(err)
        dispatch({type:USER_LOGIN_FAIL,error:err.message})
    }
}