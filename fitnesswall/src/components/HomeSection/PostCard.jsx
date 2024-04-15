import React from 'react'
import RepeatIcon from '@mui/icons-material/Repeat'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import FavoriteIcon from '@mui/icons-material/Favorite';

const PostCard = () => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeletePost=() => {
        console.log("Delete Post")
        handleClose();
    }

    const handleOpenReplyMode=() =>{
        console.log("Open Modle")
    }

    const handleCreateRepost=() => {
        console.log("Create Repost")
    }

    const handleEditPost=() => {
        console.log("Handle Edit Post")
    }

    const handleLikePost=() => {
        console.log("Handle Like Post")
    }

  return (
    <div className=''>
        <div className='flex items-center font-semibold text-gray-700 py-2'>
            <RepeatIcon/>
            <p>
                You Repost
            </p>
        </div>
        <div className='flex space-x-5'>
            <Avatar
                onClick={() => navigate('/profile/${5}')}
                className='cursor-pointer'
                alt="username"
                src="UserAvatar.png"
            />
            <div className='w-full'>
                <div className='flex justify-between items-center'>
                    <div className='flex cursor-pointer items-center space-x-2'>
                        <span className='font-semibold'>Tharaka Madushanka Wanshathilaka</span>
                        <span className='text-gray-600'>@TheLionKIng .2m</span>
                        <img className='ml-2 w-5 h-5' src="/verified.png" alt="Profile Varification Icon" />
                    </div>
                    <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                     >
                    <MoreHorizIcon />
                    </Button>
                        <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                        >
                            <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                            <MenuItem onClick={handleEditPost}>Edit</MenuItem> {/*change handleEditPost to later time*/}
                        </Menu>

                    </div>
                </div>
                <div className='mt-2'>
                    <div className='cursor-pointer'>
                        <p className='mb-2 p-0'>
                            Social Media App - Full Stack Project with Springboot & React
                        </p>
                        <img className='w-[28rem] border border-gray-400 p-5 rounded-md'
                        src="UserPost.png" alt="User Post" />
                    </div>
                    <div className='py-5 flex flex-wrap justify-between items-center'>                
                        <div className={
                            `${true? "text-pink-600":"text-gray-600"}
                             space-x-3 flex items-center`}>
                            {true?
                            <FavoriteIcon
                            onClick={handleLikePost}
                            className='cursor-pointer'/>
                            :<FavoriteBorderIcon
                            onClick={handleLikePost}
                            className='cursor-pointer'/>}
                            <p>80</p>
                        </div>
                        <div className='space-x-3 flex items-center text-gray-600'>
                            <ChatBubbleOutlineIcon
                            className='cursor-pointer'
                            onClick={handleOpenReplyMode}/>
                            <p>50</p>
                        </div>
                        <div className={
                            `${true? "text-pink-600":"text-gray-600"}
                             space-x-3 flex items-center`}>
                            <RepeatIcon
                            onClick={handleCreateRepost}
                            className='cursor-pointer'/>
                            <p>20</p>
                        </div>
                        <div className='space-x-3 flex items-center text-gray-600'>
                            <BarChartIcon className='cursor-pointer' onClick={handleOpenReplyMode}/>
                            <p>450</p>
                        </div>
                        <div className='space-x-3 flex items-center text-gray-600'>
                            <FileUploadIcon className='cursor-pointer' onClick={handleOpenReplyMode}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard