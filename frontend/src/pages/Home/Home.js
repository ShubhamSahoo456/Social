import React, { useEffect, useRef, useState } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightBar/Rightbar";
import Feed from '../../components/feed/feed';
import {io} from 'socket.io-client';
import "./home.css";
import { useSelector } from 'react-redux';
import axios from 'axios';



const Home = () => {
    const {userInfo} = useSelector(state=>state.userLogin)
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef();

    useEffect(()=>{
        socket.current = io("http://localhost:8000")
    },[])

    useEffect(()=>{
        socket.current.emit('addUser',userInfo._id)
        socket.current.on('getAllUsers',(data)=>{
            console.log(data)
            const users =Promise.all(data.map(async(ele)=>{
                try{
                    const {data} = await axios.get(`http://localhost:8000/api/v1/getUser/${ele.userId}`)
                    console.log(data)
                    setOnlineUsers((prev)=>[...prev,data])
                    return data
                }catch(err){
                    console.log(err)
                }
            }))
        })
    },[userInfo._id])

    return(
        <>
        <Topbar onlineUsers={onlineUsers}/>
        <div className='home_container'>
            <Sidebar />
            <Feed home/>
            <Rightbar onlineUsers={onlineUsers}/>
        </div>
        </>
    )
}

export default Home;