import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "./logout.css";


const Logout = ({logoutContainer, setLogoutContainer}) =>{
    const navigate = useNavigate()


    const logoutUser = ()=>{
        setLogoutContainer(false)
        localStorage.removeItem("social")
        navigate("/login")
    }

    return(
        <>
        <div className='logout' onClick={logoutUser}>
            <p>Logout</p>
        </div>
        </>
    )
}

export default Logout