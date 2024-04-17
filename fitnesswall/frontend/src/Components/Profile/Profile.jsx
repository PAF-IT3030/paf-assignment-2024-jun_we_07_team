import React, { useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from "@mui/material";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PostCard from '../HomeSection/PostCard';
import ProfileModal from './ProfileModal';

const Profile = () => {

    const navigate = useNavigate();
    
    const handleBack = () => navigate(-1);

    const [openProfileModal, setOpenProfileModal] = useState(false);
    const handleOpenProfileModal = () => setOpenProfileModal(true);
    const handleClose = () => setOpenProfileModal(false);

    const handleFollowUser=() =>{
        console.log("Handle Follow User")
    }

    const [tabValue, setTabValue]=useState("1")

    const handleTabChange=(event, newValue)=>{
        setTabValue(newValue)

        if(newValue===4){
            console.log("Likes")
        }
        else if(newValue===1){
            console.log("Posts")
        }
    }

  return (
    <div>
        <section className={`bg-white z-50 flex items-center sticky top-0 bg-opacity-95`}>            
            <KeyboardBackspaceIcon
                className='cursor-pointer'
                onClick={handleBack}
            />
            <h1 className='py-5 text-xl font-bold opacity-90 ml-5'>
                Tharaka Madushanka Wanshathilaka
            </h1>
        </section>
        <section>
            <img className='w-[100%] h-[15rem] object-cover'
            src="../backgroundImage.jpg" alt="BackgroundImage" />
        </section>
        <section className='pl-6'>
            <div className='flex justify-between items-start mt-5 h-[5rem]'>
                <Avatar 
                className='transform -translate-y-24'
                alt="username" src="../UserAvatar.png"
                sx={{width:"10rem", height:"10rem", border:"4px solid white"}}
                />
                {true?
                <Button
                onClick={handleOpenProfileModal}
                variant='contained'
                sx={{borderRadius:"20px"}}
                >
                    Edit Profile
                </Button>
                :
                <Button
                onClick={handleFollowUser}
                variant='contained'
                sx={{borderRadius:"20px"}}
                >
                    { true? "Follow" :"Unfollow" }
                </Button>
                }                
            </div>
            <div>
                <div className='flex items-center'>
                    <h1 className='font-bold text-lg'>
                        Tharaka Madushanka Wanshathilaka
                    </h1>
                    {true && <img className='ml-2 w-5 h-5' src="/verified.png" alt="Profile Varification Icon" />}
                </div>
                <h1 className='text-gray-500'>
                    @TheLionKing
                </h1>
                <div className='mt-2 space-y-3'>
                    <p>
                        I am a hardworking and dedicated person with a strong interest in the information and communication field. I am currently a 3rd-year undergraduate student at SLIIT University. I am studying Information Technology at the Faculty of Computing. I have excellent creative skills, can collaborate with many people, and work responsibly and with a good personality.
                    </p>
                    <div className='py-1 flex space-x-5'>
                        <div className='flex items-center text-gray-500'>
                            <BusinessCenterIcon/>
                            <p className='ml-2'>
                                Education
                            </p>
                        </div>
                        <div className='flex items-center text-gray-500'>
                            <LocationOnIcon/>
                            <p className='ml-2'>
                                Rathnapura
                            </p>
                        </div>
                        <div className='flex items-center text-gray-500'>
                            <CalendarMonthIcon/>
                            <p className='ml-2'>
                                Joined May 2020
                            </p>
                        </div>                        
                    </div>
                    <div className='flex items space-x-5'>
                            <div className='flex items-center space-x-1 font-semibold'>
                                <span>
                                    10
                                </span>
                                <span className='text-gray-500'>
                                    Following
                                </span>
                            </div>
                            <div className='flex items-center space-x-1 font-semibold'>
                                <span>
                                    10K
                                </span>
                                <span className='text-gray-500'>
                                    Followers
                                </span>
                            </div>
                    </div>
                </div>
            </div>
        </section>
        <section className='py-5'>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                        <Tab label="Posts" value="1" />
                        <Tab label="Replies" value="2" />
                        <Tab label="Media" value="3" />
                        <Tab label="Likes" value="4" />
                    </TabList>
                    </Box>
                    <TabPanel value="1">
                        {[1,1,1,1].map ((item)=> <PostCard/>)}
                    </TabPanel>
                    <TabPanel value="2">Users Replies</TabPanel>
                    <TabPanel value="3">Users Media</TabPanel>
                    <TabPanel value="4">Users Likes</TabPanel>
                </TabContext>
            </Box>
        </section>
        <section>
            <ProfileModal handleClose={handleClose} open={openProfileModal}/>
        </section>
    </div>
  )
}

export default Profile