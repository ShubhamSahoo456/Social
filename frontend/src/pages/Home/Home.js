import React from 'react';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightBar/Rightbar";
import Feed from '../../components/feed/feed';
import "./home.css";



const Home = () => {

    return(
        <>
        <Topbar />
        <div className='home_container'>
            <Sidebar />
            <Feed home/>
            <Rightbar />
        </div>
        </>
    )
}

export default Home;