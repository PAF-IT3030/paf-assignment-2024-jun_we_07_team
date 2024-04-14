import React from 'react'
import RepeatIcon from '@mui/icons-material/Repeat'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";


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
                onClick={() => navigate('/profile/${6}')}
                className='cursor-pointer'
                alt="username"
                src="UserAvatar.png"
            />
            <div className='w-full'>
                <div className='flex justify-between items-center'>
                    <div className='flex cursor-pointer items-center space-x-2'>
                        <span className='font-semibold'>Tharaka Madushanka Wanshathilaka</span>
                        <span className='text-gray-600'>@TheLionKIng .2m</span>
                        <img className='ml-2 w-5 h-5' src="verified.png" alt="Profile Varification Icon" />
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
                        </Menu>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard