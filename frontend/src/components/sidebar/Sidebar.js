import React, { useEffect, useState } from 'react';
import "./sidebar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';


const Sidebar = () => {
    const {userInfo} = useSelector(state=>state.userLogin)
    const [friends, setUserFriends] = useState([])

    const fetchUserfriends = async () => {
        try{
            const {data} = await axios.get(`http://localhost:8000/api/v1/getUserFollowers/${userInfo._id}`)
            setUserFriends(data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchUserfriends()
    },[])

    return(
        <>
        <div className='sidebar_container'>
            <div className='sidebar_icons_list'>
                <ul className='sidebar_list'>
                    <Link to="/" style={{textDecoration:'none',color:'black'}}><li className='sidebar_list_item'>
                        <RssFeedIcon className='list_icon'/>
                        Feed
                    </li></Link>
                    <Link to="/messenger" style={{textDecoration:'none',color:'black'}}><li className='sidebar_list_item'>
                        <ChatIcon className='list_icon'/>
                        Chats
                    </li></Link>
                    <li className='sidebar_list_item'>
                        <PlayCircleIcon className='list_icon'/>
                        Videos
                    </li>
                    <li className='sidebar_list_item'>
                        <GroupsIcon className='list_icon'/>
                        Groups
                    </li>
                    <li className='sidebar_list_item'>
                        <BookmarksIcon className='list_icon'/>
                        Bookmarks
                    </li>
                    <li className='sidebar_list_item'>
                        <HelpOutlineIcon className='list_icon'/>
                        Questions
                    </li>
                    <li className='sidebar_list_item'>
                        <WorkOutlineIcon className='list_icon'/>
                        Jobs
                    </li>
                    <li className='sidebar_list_item'>
                        <EventIcon className='list_icon'/>
                        Events
                    </li>
                    <li className='sidebar_list_item'>
                        <SchoolIcon className='list_icon'/>
                        Courses
                    </li>
                </ul>
                <hr />
            </div>
            <div className='sidebar_icons_list'>
                <ul className='sidebar_list'>
                {friends.map((ele,index)=>(
                    <Link to={`/profile/${ele._id}`} style={{textDecoration:'none',color:'black'}}><li className='sidebar_list_item' key={index}>
                    <img src={ele.profilePicture? ele.profilePicture:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} className='friend_img'/>
                    {ele.fullName}
                </li></Link>
                ))}
                    
                </ul>
            </div>
        </div>
        </>
    )
}

export default Sidebar